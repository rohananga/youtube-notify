from googleapiclient.discovery import build
from datetime import datetime, date, time, timedelta
# what do the date & time apis provide in comparison to datetime?
# timedelta is for smart subtraction of dates

api_key = "AIzaSyA2iqQC2e8TgjVReDnQ9oGtFitVMlcjB3A"
youtube = build('youtube', 'v3', developerKey = api_key)

# Later on we will have a user input feature for username, and maybe search for username based on title (e.g. Star Wars -> username = StarWars)
channel = youtube.channels().list(part = 'id', forUsername = 'marvel').execute()
channelId = channel['items'][0]['id']

res = youtube.channels().list(id = channelId, part = 'contentDetails').execute()
uploadsId = res['items'][0]['contentDetails']['relatedPlaylists']['uploads']
res = youtube.playlistItems().list(playlistId = uploadsId, part = 'snippet', maxResults = 50).execute()

videos = res['items']
curr_time = datetime.now()
curr_day = curr_time.day
# This is a temporary way of calculating the minimum bar for one week's worth of videos. Soon we may want to make the subtraction precise
# , i.e. account for the exact time 7 days ago from this second. More importantly, we have to account for edge cases of being less than 
# a week into a month or a year. timedelta library may be able to solve these issues easily -- look into that next.
min_day = curr_day - 9 # this should be 7, temporarily 8 to grab an extra video for testing 

email_vids = []

for video in videos:
    stamp = video['snippet']['publishedAt']
    stampDay = int(stamp[stamp.rindex('-')+1:stamp.index('T')])
    # print(stampDay)
    if stampDay >= min_day and video['snippet']['title'].find('Captain America') != -1:
    	#print(video['snippet']['title'])
    	video_id = video['snippet']['resourceId']['videoId'] #obain video Id
    	url = 'www.youtube.com/watch?v=' + video_id #assemble video url
    	email_vids.append(url) # add to list of videos
    if stampDay < min_day:
    	break