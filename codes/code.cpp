#include <bits/stdc++.h>
using namespace std;

mt19937 gen(random_device{}());

double getRandomNumber(double mini, double maxi)
{
    uniform_real_distribution<> distrib(mini, maxi);
    return distrib(gen);
}

int player(vector<int> player_prev_moves, vector<int> opponent_prev_moves)
{
    double prob = getRandomNumber(0.0, 1.0);
    if (prob < 0.6)
        return 1;
    return 0;
}

int opponent(vector<int> &player_prev_moves, vector<int> &opponent_prev_moves)
{
    double prob = getRandomNumber(0.0, 1.0);
    if (prob < 0.4)
        return 1;
    return 0;
}

int winner(int player, int opponent)
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
    int rounds = static_cast<int>(getRandomNumber(100, 120));
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
}