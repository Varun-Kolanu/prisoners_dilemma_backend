#include <bits/stdc++.h>
using namespace std;

int alwaysCooperate(vector<int> &player_prev_moves, vector<int> &opponent_prev_moves)
{
    return 1;
}

int alwaysDefect(vector<int> &player_prev_moves, vector<int> &opponent_prev_moves)
{
    return 0;
}

int titForTat(vector<int> &player_prev_moves, vector<int> &opponent_prev_moves)
{
    if (opponent_prev_moves.empty())
        return 1;
    return opponent_prev_moves.back();
}

int TitForTwoTats(vector<int> &player_prev_moves, vector<int> &opponent_prev_moves)
{
    int size = opponent_prev_moves.size();
    if (size <= 1)
        return 1;

    if (!opponent_prev_moves[size - 1] && !opponent_prev_moves[size - 2])
        return 0;
    return 1;
}

int TwoTitsForTat(vector<int> &player_prev_moves, vector<int> &opponent_prev_moves)
{
    int size = opponent_prev_moves.size();
    if (size <= 1)
        return 1;

    if (!opponent_prev_moves[size - 1] || !opponent_prev_moves[size - 2])
        return 0;
    return 1;
}

mt19937 gen(random_device{}());
double getRandomNumber(double mini, double maxi)
{
    uniform_real_distribution<> distrib(mini, maxi);
    return distrib(gen);
}

int cooperate75Percent(vector<int> &player_prev_moves, vector<int> &opponent_prev_moves)
{
    double prob = getRandomNumber(0.0, 1.0);
    if (prob <= 0.75)
        return 1;
    return 0;
}

int cooperate25Percent(vector<int> &player_prev_moves, vector<int> &opponent_prev_moves)
{
    double prob = getRandomNumber(0.0, 1.0);
    if (prob <= 0.25)
        return 1;
    return 0;
}

int opposeLast25Percent(vector<int> &player_prev_moves, vector<int> &opponent_prev_moves)
{
    int size = opponent_prev_moves.size();
    if (size <= 75)
        return 1;

    return 0;
}

int main()
{
}