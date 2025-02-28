import os
import scrapy
import logging

from scrapy.http import FormRequest
from .items import FranchiseBallTeamItem, FranchiseBallPlayerItem

logging.basicConfig(level=logging.DEBUG)

class FranchiseBallSpider(scrapy.Spider):
    name = 'franchiseball'
    base_url = 'https://www.franchiseball.com'

    scraped_team_data = []
    scraped_player_data = []

    custom_settings = {
        'DUPEFILTER_CLASS': 'scrapy.dupefilters.BaseDupeFilter',
        'ITEM_PIPELINES': {
            'franchiseball.pipelines.SaveToTeamExcelPipeline': 1,
            'franchiseball.pipelines.SaveToPlayerMongoDBPipeline': 2,
        }
    }

    def start_requests(self):
        yield scrapy.Request(url="https://www.franchiseball.com/login.php", callback=self.parse)

    def parse(self, response):
        formdata = {
            'login_email': 'cincinnati-reds@outlook.com',
            'login_password': 'Oicu812',
            'submit': 'Login'
        }

        yield FormRequest.from_response(
            response,
            formdata=formdata,
            clickdata={'name': 'submit'},
            callback=self.after_login
        )

    def after_login(self, _):
        team_list_path = os.path.join(os.getcwd(), 'franchiseball', 'assets', 'team_list.txt')
        player_list_path = os.path.join(os.getcwd(), 'franchiseball', 'assets', 'player_list.txt')
        
        try:
            with open(team_list_path, 'r') as f:
                team_urls = f.readlines()
            for url in team_urls:
                yield scrapy.Request(url.strip(), callback=self.parse_team)
        except FileNotFoundError:
            self.log(f"File not found: {team_list_path}")

        try:
            with open(player_list_path, 'r') as f:
                player_urls = f.readlines()
            for url in player_urls:
                yield scrapy.Request(url.strip(), callback=self.parse_player)
        except FileNotFoundError:
            self.log(f"File not found: {player_list_path}")

    def parse_team(self, response):
        team_name = response.xpath('//span[@id="team-name-label"]/text()').get()
        team_rank = response.xpath('//div[@id="team-rank-value"]/text()').get()

        runs_on = response.xpath('//div[@id="team-team-stats"]/div[2]/div[contains(@class, "stat")]/text()').get()
        world_titles = response.xpath('//div[@id="team-status-titles"]/span[1]/span[@class="title-num"]/text()').get()
        league_titles = response.xpath('//div[@id="team-status-titles"]/span[2]/span[@class="title-num"]/text()').get()
        division_titles = response.xpath('//div[@id="team-status-titles"]/span[3]/span[@class="title-num"]/text()').get()

        team_url = response.url
        team_id = team_url.split('id=')[-1]

        if team_name and team_id:
            pg_value = int(team_rank) / 50 + 1
            ranking_url = f'https://www.franchiseball.com/rankings.php?filter=world&subject=teams&type=batter&id=1&order=ranking_rank&pg={int(pg_value)}'

            yield scrapy.Request(ranking_url, callback=self.parse_rankings, meta={
                'team_id': team_id,
                'team_name': team_name,
                'team_rank': team_rank,
                'current_page': int(pg_value),
                'runs_on': runs_on,
                'world_titles': world_titles,
                'league_titles': league_titles,
                'division_titles': division_titles,
            })

    def parse_rankings(self, response):
        team_id = response.meta['team_id']
        team_name = response.meta['team_name']
        team_rank = response.meta['team_rank']
        current_page = response.meta['current_page']

        runs_on = response.meta['runs_on']
        world_titles = response.meta['world_titles']
        league_titles = response.meta['league_titles']
        division_titles = response.meta['division_titles']

        rankings_table = response.xpath('//table[contains(@class, "rankings_table")]//tr')

        matched = False

        for row in rankings_table:
            team_url = row.xpath('.//td[1]//a/@href').get()
            row_team_id = team_url.split("id=")[-1]

            if row_team_id and team_id == row_team_id:
                matched = True

                win = row.xpath('.//td[3]/text()').get()
                loss = row.xpath('.//td[4]/text()').get()
                runs_differential = row.xpath('.//td[5]/text()').get()
                avg = row.xpath('.//td[6]/text()').get()
                obp = row.xpath('.//td[7]/text()').get()
                era = row.xpath('.//td[8]/text()').get()
                whip = row.xpath('.//td[9]/text()').get()

                win = float(win) if win else 0.0
                loss = float(loss) if loss else 0.0
                runs_differential = float(runs_differential) if runs_differential else 0.0
                avg = float(avg) if avg else 0.0
                obp = float(obp) if obp else 0.0
                era = float(era) if era else 0.0
                whip = float(whip) if whip else 0.0

                weighted_score = win * 0.2 - loss * 0.15 + runs_differential * 0.2 + avg * 0.1 + obp * 0.15 - era * 0.15 - whip * 0.05

                team_item = FranchiseBallTeamItem(
                    team_name=team_name,
                    win=win,
                    loss=loss,
                    runs_differential=runs_differential,
                    avg=avg,
                    obp=obp,
                    era=era,
                    whip=whip,
                    team_rank=team_rank,
                    runs_on=runs_on,
                    world_titles=world_titles,
                    league_titles=league_titles,
                    division_titles=division_titles,
                    weighted_score=weighted_score
                )

                self.scraped_team_data.append(team_item)

        if not matched:
            next_page = current_page + 1
            next_page_url = f'https://www.franchiseball.com/rankings.php?filter=world&subject=teams&type=batter&id=1&order=ranking_rank&pg={next_page}'
            yield scrapy.Request(next_page_url, callback=self.parse_rankings, meta={
                'team_id': team_id,
                'team_name': team_name,
                'team_rank': team_rank,
                'current_page': next_page,
                'runs_on': runs_on,
                'world_titles': world_titles,
                'league_titles': league_titles,
                'division_titles': division_titles,
            })

    def parse_player(self, response):
        player_link = response.url
        player_name = response.xpath('//span[@id="player-profile-name"]/text()').get()
        player_position = response.xpath('//span[@id="player-profile-status"]/span[1]/text()').get()
        player_age = response.xpath('//span[@id="player-profile-stat-age-value"]/text()').get()

        player_name = player_name.strip() if player_name else None
        player_position = player_position.strip() if player_position else None
        player_age = player_age.strip() if player_age else None

        scout_rating_tab = response.xpath('//a[@href="#tab-content-stats-ratings"]')

        if scout_rating_tab:
                yield scrapy.Request(
                response.url,
                callback=self.parse_scout_ratings,
                meta={'player_link': player_link, 'player_name': player_name, 'player_position': player_position, 'player_age': player_age}
            )

    def parse_scout_ratings(self, response):
        player_link = response.meta['player_link']
        player_name = response.meta['player_name']
        player_position = response.meta['player_position']
        player_age = response.meta['player_age']

        pitching_ratings_section = response.xpath('//div[@id="ratings-pitching-bars-container"]')

        player_control = pitching_ratings_section.xpath('.//div[1]/div[1]/div[1]/span/text()').get()
        player_movement = pitching_ratings_section.xpath('.//div[2]/div[1]/div[1]/span/text()').get()
        player_velocity = pitching_ratings_section.xpath('.//div[3]/div[1]/div[1]/span/text()').get()
        player_stamina = pitching_ratings_section.xpath('.//div[4]/div[1]/div[1]/span/text()').get()

        hitting_ratings_section = response.xpath('//div[@id="ratings-hitting-bars-container"]')

        player_power = hitting_ratings_section.xpath('.//div[1]/div[1]/div[1]/div[1]/span/text()').get()
        player_contact = hitting_ratings_section.xpath('.//div[1]/div[2]/div[1]/div[1]/span/text()').get()
        player_speed = hitting_ratings_section.xpath('.//div[1]/div[3]/div[1]/div[1]/span/text()').get()
        player_defense = hitting_ratings_section.xpath('.//div[1]/div[4]/div[1]/div[1]/span/text()').get()

        self.log(f"Scout Ratings: Control={player_control}, Movement={player_movement}, Velocity={player_velocity}, Stamina={player_stamina} Power={player_power}, Contact={player_contact}, Speed={player_speed}, Defense={player_defense}")

        player_item = FranchiseBallPlayerItem(
            link=player_link,
            name=player_name,
            position=player_position,
            age=player_age,
            control=player_control,
            movement=player_movement,
            velocity=player_velocity,
            stamina=player_stamina,
            power=player_power,
            contact=player_contact,
            speed=player_speed,
            defense=player_defense
        )

        self.scraped_player_data.append(player_item)

    def close(self):
        self.log("Crawl finished.")