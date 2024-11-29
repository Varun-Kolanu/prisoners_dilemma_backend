const getUpperCode = () => {
    return `#include <bits/stdc++.h>
using namespace std;

mt19937 gen(random_device{}());
double getRandomNumber(double mini, double maxi)
{
    uniform_real_distribution<> distrib(mini, maxi);
    return distrib(gen);
}
`
}

const getLowerCode = (rounds) => {
    return `int winner(int player, int opponent)
{
    if (player == opponent)
        return 0;
    return player > opponent ? 1 : 2;
}

void print_array(vector<int> &array)
{
    cout << "[";
    for (size_t i = 0; i < array.size(); i++)
    {
        cout << array[i];
        if (i != array.size() - 1)
            cout << ",";
    }
    cout << "]" << endl;
}

int main()
{
    vector<int> player_moves, opponent_moves;
    int player_score = 0, opponent_score = 0;
    int rounds = ${rounds};
    for (int i = 0; i < rounds; i++)
    {
        int player_move = player(player_moves, opponent_moves);
        int opponent_move = opponent(player_moves, opponent_moves);

        player_moves.push_back(player_move);
        opponent_moves.push_back(opponent_move);

        if (player_move && opponent_move)
        {
            player_score += 3;
            opponent_score += 3;
        }
        else if (!player_move && !opponent_move)
        {
            player_score += 1;
            opponent_score += 1;
        }
        else if (player_move && !opponent_move)
            opponent_score += 5;
        else if (!player_move && opponent_move)
            player_score += 5;
    }

    int win = winner(player_score, opponent_score);
    vector<int> toSend = {player_score, opponent_score, win};
    print_array(toSend);

    return 0;
}`
}

export const getGameCode = (rounds, player_function, opponent_function) => {

    let upperCode = getUpperCode()
    const lowerCode = getLowerCode(rounds)

    const code = upperCode + "\n" + player_function + "\n" + opponent_function + "\n" + lowerCode;
    return code;
}

export const getCheckerCode = (player_function) => {
    let code = `
#include<bits/stdc++.h>
using namespace std;

mt19937 gen(random_device{}());
double getRandomNumber(double mini, double maxi)
{
    uniform_real_distribution<> distrib(mini, maxi);
    return distrib(gen);
}
\n
        ` + player_function + "\n\n" +
        `
int main() {
    cout << player({}, {});
    return 0;
}
    `
    return code;
}