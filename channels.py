# setup, imports, and API key
from apiclient.discovery import build

api_key = "AIzaSyAHUITXF9oo2Ed24HO1IrDRtYqNLv15_b8"
youtube = build('youtube', 'v3', developerKey = api_key)

# first retrieve channel ID of "username"
username = "CaptainSparklez"
channel = youtube.channels().list(part = 'id', forUsername = username).execute()
currentId = channel['items'][0]['id']

# use channel ID to get most recent video
res = youtube.search().list(part='snippet', channelId = currentId, maxResults = '5', order = 'date',
type = 'video').execute()
result = res['items'][0]['snippet']['title']
print(result)






