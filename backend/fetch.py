import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the Client ID and Client Secret from environment variables
client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
access_token = os.getenv('ACCESS_TOKEN')

# SkillsFuture API token URL
token_url = 'https://public-api.ssg-wsg.gov.sg/dp-oauth/oauth/token'

# API Endpoint to retrieve courses
courses_url = 'https://public-api.ssg-wsg.gov.sg/courses/directory'


# Step 1: Fetch courses data from SkillsFuture API
def fetch_courses_data(access_token):
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }

    params = {
        'pageSize': 100,
        'page': 1,
        'retrieveType': 'FULL'
    }

    response = requests.get(courses_url, headers=headers, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error fetching courses: {response.status_code}, {response.text}")

# Main execution block
if __name__ == "__main__":
    try:
        courses_data = fetch_courses_data(access_token)

        print("Courses Data: ", courses_data)

    except Exception as e:
        print(f"An error occurred: {e}")
