api_key = "AIzaSyAHUITXF9oo2Ed24HO1IrDRtYqNLv15_b8"


from apiclient.discovery import build

youtube = build('youtube', 'v3', developerKey = api_key)

currentId = 'UCshoKvlZGZ20rVgazZp5vnQ'

res = youtube.search().list(part='snippet', channelId = currentId, maxResults = '5', order = 'date',
type = 'video').execute()

result = res['items'][0]['snippet']['title']

print(result)






