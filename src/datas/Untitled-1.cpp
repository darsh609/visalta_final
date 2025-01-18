#include <iostream>
#include <vector>
#include <algorithm>
#include <limits.h>

using namespace std;

vector<int> minSumSolution(vector<int>& arr, vector<int>& query, int k) {
    vector<int> answer(query.size(), -1);
    
    // Iterate through each query value
    for (int q = 0; q < query.size(); q++) {
        int z = query[q];
        int min_sum = INT_MAX;

        // Check all pairs (i, j) where i and j are indices of array arr
        for (int i = 0; i < arr.size(); i++) {
            for (int j = 0; j < arr.size(); j++) {
                int a = arr[i];
                int b = arr[j];
                
                // Check if the linear equation is satisfied
                if (a * arr[i] + b * arr[j] == z) {
                    // If a + b is less than or equal to k, update the minimum sum
                    if (a + b <= k) {
                        min_sum = min(min_sum, a + b);
                    }
                }
            }
        }
        
        // If a valid sum was found, update the answer array
        if (min_sum != INT_MAX) {
            answer[q] = min_sum;
        }
    }
    
    return answer;
}

int main() {
    vector<int> arr = {1, 17, 2, 3};  // Example array
    vector<int> query = {35, 50, 20};  // Example queries
    int k = 20;  // Example value for k
    
    vector<int> result = minSumSolution(arr, query, k);
    
    for (int i = 0; i < result.size(); i++) {
        cout << "Query " << query[i] << ": " << result[i] << endl;
    }
    
    return 0;
}