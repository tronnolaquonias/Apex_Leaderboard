from flask import Flask, jsonify
from flask_cors import CORS
import httpx
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

def extract_player_data(player):
    try:
        name = player.find('a', {'style': 'color: white'}).text.strip()
        rp = player.find('span', {'style': 'color: white; font-size: 20px;'}).text.strip()
        standing = player.find('span', style=lambda s: 'font-size: 25px;' in s or 'font-size: 22px;' in s).text.strip()

        print(name)

        return {
            "name": name,
            "rp": rp,
            "standing": standing
        }
    except Exception as e:
        return {"error": str(e)}

@app.route('/api/leaderboard/xbox', methods=['GET'])
def get_leaderboard_xbox():
    url = 'https://apexlegendsstatus.com/live-ranked-leaderboards/Battle_Royale/XBOX'
    response = httpx.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    tbody = soup.find('tbody', {'style': 'font-weight: 500'})
    players = tbody.find_all('tr')[:50]
    leaderboard = [extract_player_data(player) for player in players]
    return jsonify(leaderboard)

if __name__ == '__main__':
    app.run(port=5002, debug=True)
