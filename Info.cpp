#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main() {
    string name, studentClass;
    int rollNo;
    int subjectCount;

    cout << "Enter student name: ";
    getline(cin, name);

    cout << "Enter class: ";
    getline(cin, studentClass);

    cout << "Enter roll number: ";
    cin >> rollNo;

    cout << "How many subjects? ";
    cin >> subjectCount;
    cin.ignore(); // Clear the leftover newline

    vector<string> subjects;
    for (int i = 0; i < subjectCount; ++i) {
        string subject;
        cout << "Enter subject " << i + 1 << ": ";
        getline(cin, subject);
        subjects.push_back(subject);
    }

    cout << "\n--- Student Information ---\n";
    cout << "Name: " << name << '\n';
    cout << "Class: " << studentClass << '\n';
    cout << "Roll number: " << rollNo << '\n';
    cout << "Subjects: ";
    for (size_t i = 0; i < subjects.size(); ++i) {
        if (i > 0) cout << ", ";
        cout << subjects[i];
    }
    cout << '\n';

    return 0;
}
