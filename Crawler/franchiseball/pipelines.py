import os
import pymongo
import pandas as pd

from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

class SaveToTeamExcelPipeline:
    def process_item(self, item, spider):
        spider.scraped_team_data.append(dict(item))

    def close_spider(self, spider):
        if spider.scraped_team_data:
            df = pd.DataFrame(spider.scraped_team_data)
            df.to_excel('teams.xlsx', index=False)
            spider.log("Team data saved to teams.xlsx")
        else:
            spider.log("No team data to save.")


class SaveToPlayerMongoDBPipeline:
    def open_spider(self, _):
        self.mongo_uri = MONGO_URI
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client.get_database()
        self.collection = self.db["player"]

    def process_item(self, item, _):
        player_data = dict(item)
        self.collection.insert_one(player_data)
        return item

    def close_spider(self, spider):
        self.client.close()
        spider.log("Player data saved to MongoDB.")