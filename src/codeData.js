export const pythonCode = `#!/usr/bin/env python3
import sys
import random
import math
import time
import string
import re
import cmath
import datetime

inputs = []
idx = 0

def next_input(default=""):
    global idx
    if idx < len(inputs):
        val = inputs[idx]
        idx += 1
        return val
    return default

def show_menu():
    print("=" * 60)
    print("  HAAS HALL ACADEMY - PYTHON CHALLENGES")
    print("=" * 60)
    print()
    print("  1. List of Flavors           15. Sum Two Random Numbers")
    print("  2. List Numbers Command      16. Temperature Conversion")
    print("  3. Looping the Array         17. Password Generator")
    print("  4. User Info Input           18. Watch Program")
    print("  5. Missing Numbers           19. List Multiplication")
    print("  6. DNA Sequence Analysis     20. Euclidean Algorithm (GCD)")
    print("  7. The Calculator            21. Question Marks Puzzle")
    print("  8. Divisibility by 7         22. Prime Number Checker")
    print("  9. Numbers & Letters Input   23. Dark Outside?")
    print(" 10. Circle Area (v1)          24. Target Text Matching")
    print(" 11. Rock Paper Scissors       25. Heads or Tails")
    print(" 12. Circle Area (v2)          26. Quadratic Equation Solver")
    print(" 13. Password Validator        27. Story Game: Top Secret")
    print(" 14. Dictionary Demo")
    print()
    print("-" * 60)
    print("Enter a number (1-27) to run a challenge")

challenges = {
    1: "List of Flavors",
    2: "List Numbers Command",
    3: "Looping the Array",
    4: "User Info Input",
    5: "Missing Numbers",
    6: "DNA Sequence Analysis",
    7: "The Calculator",
    8: "Divisibility by 7",
    9: "Numbers & Letters Input",
    10: "Circle Area (v1)",
    11: "Rock Paper Scissors",
    12: "Circle Area (v2)",
    13: "Password Validator",
    14: "Dictionary Demo",
    15: "Sum Two Random Numbers",
    16: "Temperature Conversion",
    17: "Password Generator",
    18: "Watch Program",
    19: "List Multiplication",
    20: "Euclidean Algorithm (GCD)",
    21: "Question Marks Puzzle",
    22: "Prime Number Checker",
    23: "Dark Outside?",
    24: "Target Text Matching",
    25: "Heads or Tails",
    26: "Quadratic Equation Solver",
    27: "Story Game: Top Secret"
}

def run_challenge(n):
    name = challenges.get(n, "Unknown")
    print()
    print(">>> CHALLENGE " + str(n) + ": " + name.upper() + " <<<")
    print()

    if n == 1:
        print("Ice Cream Flavor Combinations:")
        print("-" * 30)
        num_combos_str = next_input("5")
        try:
            num_combos = int(num_combos_str)
        except:
            num_combos = 5
        if num_combos <= 0:
            num_combos = 5
        flavors = ["Chocolate", "Strawberry", "Vanilla", "Rocky Road", "Mint"]
        all_combos = []
        for i in range(len(flavors)):
            for j in range(i+1, len(flavors)):
                all_combos.append(flavors[i] + " + " + flavors[j])
        if num_combos > len(all_combos):
            num_combos = len(all_combos)
        selected = random.sample(all_combos, num_combos)
        for combo in selected:
            print("  " + combo)
        print()
        print("Showing " + str(num_combos) + " of " + str(len(all_combos)) + " possible combinations")

    elif n == 2:
        print("List Numbers Command Demo")
        print("-" * 30)
        print("Building initial list:")
        my_list = []
        for i in range(5):
            item = next_input("")
            if item:
                try:
                    my_list.append(int(item))
                except:
                    try:
                        my_list.append(float(item))
                    except:
                        my_list.append(item)
        if not my_list:
            my_list = [1, 2, 3, 4, 5]
        print("Initial list: " + str(my_list))
        print()
        removed = my_list[-1] if my_list else None
        my_list = my_list[:-1] if my_list else []
        print("After remove(last): " + str(my_list))
        if my_list:
            my_list.insert(0, random.randint(0, 9))
        if my_list:
            my_list.append(random.randint(0, 9))
        print("After insert/append operations: " + str(my_list))
        print()
        print("Final list: " + str(my_list))

    elif n == 3:
        print("Looping Through an Array")
        print("-" * 30)
        print("Array:")
        integers = []
        for i in range(5):
            item = next_input("")
            if item:
                try:
                    integers.append(int(item))
                except:
                    pass
        if not integers:
            integers = [7, 3, 4, 3, 8, 2, 1, 1, 2, 7]
        print(str(integers))
        print()
        print("Elements:")
        for index, value in enumerate(integers):
            print("  Index " + str(index) + ": " + str(value))

    elif n == 4:
        print("User Info Input")
        print("-" * 30)
        name = next_input("Student")
        age = next_input("18")
        year = next_input("2006")
        print("Name: " + str(name))
        print("Age: " + str(age))
        print("Birth Year: " + str(year))
        print()
        try:
            age_int = int(age)
            if age_int < 0:
                age_int = abs(age_int)
            current_year = datetime.datetime.now().year
            years_to_100 = 100 - age_int
            year_at_100 = current_year + years_to_100
            print(str(name) + ". In " + str(years_to_100) + " years from now,")
            print("in the year " + str(year_at_100) + ", you'll be 100 years old!")
        except:
            print("Could not calculate - please enter valid data")

    elif n == 5:
        print("Finding Missing Numbers")
        print("-" * 30)
        print("Checking numbers from 0 to 100:")
        my_list = []
        for i in range(5):
            item = next_input("")
            if item:
                try:
                    num = int(item)
                    if 0 <= num <= 100:
                        my_list.append(num)
                except:
                    pass
        if not my_list:
            my_list = [1, 2, 3, 5, 6, 7, 9, 10]
        my_list = sorted(set(my_list))
        print()
        print("Original list: " + str(my_list))
        if len(my_list) >= 2:
            full_range = set(range(my_list[0], my_list[-1] + 1))
            missing = sorted(full_range - set(my_list))
            print("Missing numbers: " + str(missing))
        else:
            print("Need at least 2 unique numbers")

    elif n == 6:
        print("DNA Sequence Analysis")
        print("-" * 30)
        DNA = "ACAAGATGCCATTGTCCCCCGGCCTCCTGCTGCTGCTGCTCTCCGGGGCCACGGCCACCGCTGCCCTGCCCCTGGAGGGTGGCCCCACCGGCCGAGACAGCGAGCATATGCAGGAAGCGGCAGGAATAAGGAAAAGCAGCCTCCTGACTTTCCTCGCTTGGTGGTTTGAGTGGACCTCCCAGGCCAGTGCCGGGCCCCTCATAGGAGAGGAAGCTCGGGAGGTGGCCAGGCGGCAGGAAGGCGCACCCCCCCAGCAATCCGCGCGCCGGGACAGAATGCCCTGCAGGAACTTCTTCTGGAAGACCTTCTCCTCCTGCAAATAAAACCTCACCCATGAATGCTCACGCAAGTTTAATTACAGACCTGAA"
        print("Sequence (first 80 chars):")
        print("  " + DNA[:80])
        counts = {"A": 0, "C": 0, "G": 0, "T": 0}
        for base in DNA:
            if base in counts:
                counts[base] += 1
        print()
        print("Base Counts:")
        for base in sorted(counts.keys()):
            print("  " + base + " = " + str(counts[base]))
        total = sum(counts.values())
        gc = ((counts["G"] + counts["C"]) / total) * 100
        print()
        print("GC Content: " + str(round(gc, 2)) + "%")

    elif n == 7:
        print("The Calculator")
        print("-" * 30)
        print("Operations: ADD, SUB, MULT, DIV, EXP, SQRT")
        print()
        num1 = next_input("10")
        op = next_input("ADD").upper()
        num2 = next_input("5")
        try:
            a = float(num1)
            print("First Number: " + str(a))
            print("Operation: " + str(op))
            if op != "SQRT":
                b = float(num2)
                print("Second Number: " + str(b))
            print()
            if op == "ADD":
                print("Result: " + str(a) + " + " + str(b) + " = " + str(a + b))
            elif op == "SUB":
                print("Result: " + str(a) + " - " + str(b) + " = " + str(a - b))
            elif op in ["MULT", "MUL"]:
                print("Result: " + str(a) + " x " + str(b) + " = " + str(a * b))
            elif op == "DIV":
                if b != 0:
                    print("Result: " + str(a) + " / " + str(b) + " = " + str(round(a / b, 4)))
                else:
                    print("Error: Division by zero")
            elif op == "EXP":
                print("Result: " + str(a) + " ^ " + str(b) + " = " + str(a ** b))
            elif op == "SQRT":
                if a >= 0:
                    print("Result: sqrt(" + str(a) + ") = " + str(round(math.sqrt(a), 4)))
                else:
                    print("Result: sqrt(" + str(a) + ") = " + str(cmath.sqrt(a)))
            else:
                print("Unknown operation")
        except Exception as e:
            print("Error: " + str(e))

    elif n == 8:
        print("Range List of Divisibility by 7")
        print("-" * 30)
        start = next_input("0")
        end = next_input("100")
        try:
            start_int = int(start)
            end_int = int(end)
            if end_int > 500:
                end_int = 500
            if start_int > end_int:
                start_int, end_int = end_int, start_int
            print("Range: " + str(start_int) + " to " + str(end_int))
            print()
            divisible = [x for x in range(start_int, end_int + 1) if x % 7 == 0]
            print("Numbers divisible by 7:")
            line = ""
            for num in divisible:
                line += str(num) + " "
                if len(line.split()) % 8 == 0:
                    print("  " + line)
                    line = ""
            if line:
                print("  " + line)
            print()
            print("Found " + str(len(divisible)) + " numbers")
        except:
            print("Invalid input")

    elif n == 9:
        print("Numbers & Letters Input")
        print("-" * 30)
        sentence = next_input("Hello World 123")
        print("Input: '" + sentence + "'")
        print()
        letters = sum(1 for c in sentence if c.isalpha())
        digits = sum(1 for c in sentence if c.isdigit())
        uppers = sum(1 for c in sentence if c.isupper())
        lowers = sum(1 for c in sentence if c.islower())
        print("Analysis:")
        print("  Total Letters: " + str(letters))
        print("  Uppercase: " + str(uppers))
        print("  Lowercase: " + str(lowers))
        print("  Total Digits: " + str(digits))

    elif n == 10:
        print("Circle Area (v1)")
        print("-" * 30)
        radius_str = next_input("5")
        try:
            radius = float(radius_str)
            area = math.pi * radius ** 2
            circ = 2 * math.pi * radius
            print("Radius: " + str(radius))
            print()
            print("Area: " + str(round(area, 4)))
            print("Circumference: " + str(round(circ, 4)))
        except:
            print("Invalid radius")

    elif n == 11:
        print("Rock Paper Scissors")
        print("-" * 30)
        player = next_input("rock").lower()
        computer = random.choice(["rock", "paper", "scissors"])
        print("Your choice: " + player.upper())
        print("Computer's choice: " + computer.upper())
        print()
        if player == computer:
            print("IT'S A TIE!")
        elif (player == "rock" and computer == "scissors") or (player == "paper" and computer == "rock") or (player == "scissors" and computer == "paper"):
            print("YOU WIN!")
        else:
            print("YOU LOSE!")

    elif n == 12:
        print("Circle Area (v2)")
        print("-" * 30)
        radius_str = next_input("5")
        try:
            radius = float(radius_str)
            area = math.pi * radius ** 2
            diam = 2 * radius
            circ = math.pi * diam
            print("Radius: " + str(radius))
            print("Diameter: " + str(diam))
            print("Area: " + str(round(area, 4)))
            print("Circumference: " + str(round(circ, 4)))
        except:
            print("Invalid radius")

    elif n == 13:
        print("Password Validator")
        print("-" * 30)
        password = next_input("Test123!")
        print("Password length: " + str(len(password)))
        print()
        print("Required Criteria:")
        print("  - At least one uppercase letter")
        print("  - At least one lowercase letter")
        print("  - At least one digit")
        print("  - At least one special character")
        print("  - Length between 8 and 14 characters")
        print()
        has_upper = bool(re.search(r"[A-Z]", password))
        has_lower = bool(re.search(r"[a-z]", password))
        has_digit = bool(re.search(r"[0-9]", password))
        has_special = bool(re.search(r"[!@#$%^&*()_+=\\-\\[\\]{}|:;<>,.?/~]", password))
        length_ok = 8 <= len(password) <= 14
        valid = has_upper and has_lower and has_digit and has_special and length_ok
        if valid:
            print("Result: VALID PASSWORD")
        else:
            print("Result: INVALID PASSWORD")

    elif n == 14:
        print("Dictionary Demo")
        print("-" * 30)
        car = {"brand": "Ford", "model": "Mustang", "year": 1964}
        print("Initial dict: " + str(car))
        print()
        print("Access operations:")
        print("  brand: " + str(car["brand"]))
        print("  model: " + str(car.get("model")))
        print("  year: " + str(car.get("year")))
        car["year"] = 2024
        print()
        print("After update: " + str(car))

    elif n == 15:
        print("Sum Two Random Numbers")
        print("-" * 30)
        num1 = random.randint(1, 1000000)
        num2 = random.randint(1, 1000000)
        print("First number: " + str(num1))
        print("Second number: " + str(num2))
        print()
        print("Sum: " + str(num1 + num2))

    elif n == 16:
        print("Temperature Conversion")
        print("-" * 30)
        temp_input = next_input("100C").upper()
        convert_to = next_input("F").upper()
        try:
            if temp_input[-1] in ['C', 'F', 'K']:
                temp = float(temp_input[:-1])
                scale = temp_input[-1]
            else:
                temp = float(temp_input)
                scale = 'C'
            print("Input: " + str(temp) + scale)
            print("Convert to: " + convert_to)
            print()
            if scale == convert_to:
                print("Already in " + scale)
            elif scale == 'C':
                if convert_to == 'F':
                    result = temp * 9/5 + 32
                else:
                    result = temp + 273.15
                print("Result: " + str(round(result, 2)) + " " + convert_to)
            elif scale == 'F':
                if convert_to == 'C':
                    result = (temp - 32) * 5/9
                else:
                    result = (temp - 32) * 5/9 + 273.15
                print("Result: " + str(round(result, 2)) + " " + convert_to)
            elif scale == 'K':
                if convert_to == 'C':
                    result = temp - 273.15
                else:
                    result = (temp - 273.15) * 9/5 + 32
                print("Result: " + str(round(result, 2)) + " " + convert_to)
        except:
            print("Invalid temperature format")

    elif n == 17:
        print("Randomized Password Generator")
        print("-" * 30)
        include_word = next_input("no").lower()
        custom_word = ""
        if include_word == "yes":
            custom_word = next_input("word")
        length_str = next_input("12")
        try:
            length = int(length_str)
            if length > 30:
                length = 30
            if length < 8:
                length = 8
        except:
            length = 12
        chars = string.ascii_letters + string.digits + "!@#$%^&*"
        password = custom_word + ''.join(random.choice(chars) for _ in range(length - len(custom_word)))
        print("Your password is:")
        print(password)

    elif n == 18:
        print("=" * 50)
        print("  UNIVERSAL WATCH PROGRAM")
        print("=" * 50)
        print()
        print("Select a mode:")
        print("  [time]      - Current Time Display")
        print("  [timer]     - Countdown Timer")
        print("  [stopwatch] - Stopwatch")
        print("  [reaction]  - Reaction Time Game")
        print("  [back]      - Return to menu")
        print()
        mode = next_input("time").strip().lower()

        if mode == "back" or mode == "menu":
            print("Returning to main menu...")

        elif mode == "time" or mode == "1":
            print()
            print("-" * 50)
            print("  CURRENT TIME DISPLAY")
            print("-" * 50)
            print()
            now = datetime.datetime.now()
            print("Loading time data...")
            print()
            print("TIME BREAKDOWN:")
            print("-" * 30)
            ns = now.microsecond * 1000
            us = now.microsecond
            ms = now.microsecond // 1000
            sec = now.second
            minute = now.minute
            hour = now.hour
            hour_12 = hour % 12 if hour % 12 != 0 else 12
            am_pm = "AM" if hour < 12 else "PM"
            day = now.day
            month = now.month
            year = now.year
            decade = (year // 10) * 10
            century = (year // 100) + 1
            print("  Nanoseconds:  " + str(ns) + " ns")
            print()
            print("  Microseconds: " + str(us) + " us")
            print()
            print("  Milliseconds: " + str(ms) + " ms")
            print()
            print("  Seconds:      " + str(sec) + " s")
            print()
            print("  Minutes:      " + str(minute) + " min")
            print()
            print("  Hours:        " + str(hour) + " (24h) / " + str(hour_12) + " " + am_pm + " (12h)")
            print()
            print("  Day:          " + str(day))
            print()
            print("  Month:        " + str(month) + " (" + now.strftime("%B") + ")")
            print()
            print("  Year:         " + str(year))
            print()
            print("  Decade:       " + str(decade) + "s")
            print()
            print("  Century:      " + str(century) + "th century")
            print()
            print("-" * 30)
            print("Full timestamp: " + now.strftime("%Y-%m-%d %H:%M:%S.%f"))

        elif mode == "timer" or mode == "2":
            print()
            print("-" * 50)
            print("  COUNTDOWN TIMER")
            print("-" * 50)
            print()
            duration_str = next_input("10")
            try:
                duration = int(duration_str)
                if duration > 60:
                    duration = 60
                if duration < 1:
                    duration = 1
            except:
                duration = 10
            print("Timer set for " + str(duration) + " seconds")
            print()
            print("Starting countdown...")
            print()
            for sec in range(duration, 0, -1):
                if sec > 10:
                    if sec % 5 == 0:
                        print("  " + str(sec) + " seconds remaining...")
                else:
                    print("  " + str(sec) + "...")
                print()
            print()
            print("=" * 30)
            print("  TIME'S UP!")
            print("=" * 30)

        elif mode == "stopwatch" or mode == "3":
            print()
            print("-" * 50)
            print("  STOPWATCH")
            print("-" * 50)
            print()
            duration_str = next_input("10")
            try:
                duration = int(duration_str)
                if duration > 60:
                    duration = 60
                if duration < 1:
                    duration = 1
            except:
                duration = 10
            print("Stopwatch running for " + str(duration) + " seconds...")
            print()
            for sec in range(1, duration + 1):
                mins = sec // 60
                secs = sec % 60
                ms_sim = random.randint(0, 999)
                print("  " + str(mins).zfill(2) + ":" + str(secs).zfill(2) + "." + str(ms_sim).zfill(3))
                print()
            print()
            print("=" * 30)
            print("  STOPWATCH STOPPED")
            print("  Final: " + str(duration // 60).zfill(2) + ":" + str(duration % 60).zfill(2) + ".000")
            print("=" * 30)

        elif mode == "reaction" or mode == "4":
            print()
            print("-" * 50)
            print("  REACTION TIME GAME")
            print("-" * 50)
            print()
            print("Get ready to test your reflexes!")
            print()
            print("Waiting...")
            print()
            countdown = random.randint(2, 5)
            for i in range(countdown, 0, -1):
                print("  " + str(i) + "...")
                print()
            print()
            print("=" * 30)
            print("  >>> REACT NOW! <<<")
            print("=" * 30)
            print()
            reaction_time = random.randint(150, 400)
            print("Your reaction time: " + str(reaction_time) + " milliseconds")
            print()
            if reaction_time < 200:
                print("Rating: INCREDIBLE! Lightning reflexes!")
            elif reaction_time < 250:
                print("Rating: EXCELLENT! Very fast!")
            elif reaction_time < 300:
                print("Rating: GOOD! Above average!")
            elif reaction_time < 350:
                print("Rating: AVERAGE. Keep practicing!")
            else:
                print("Rating: SLOW. Try again!")
        else:
            print("Invalid mode: '" + mode + "'")
            print("Please choose: time, timer, stopwatch, or reaction")

    elif n == 19:
        print("List Multiplication")
        print("-" * 30)
        nums = []
        for i in range(5):
            item = next_input("")
            if item:
                try:
                    nums.append(int(item))
                except:
                    pass
        if not nums:
            nums = [18, 2, 4, -2, 5, -7]
        print("List: " + str(nums))
        print()
        product = 1
        count = min(5, len(nums))
        for i in range(count):
            product *= nums[i]
            print("  After multiplying " + str(nums[i]) + ": " + str(product))
        print()
        print("Product of first " + str(count) + " numbers: " + str(product))

    elif n == 20:
        print("Euclidean Algorithm (GCD)")
        print("-" * 30)
        a_str = next_input("48")
        b_str = next_input("18")
        try:
            a = int(a_str)
            b = int(b_str)
            orig_a, orig_b = a, b
            while b:
                a, b = b, a % b
            print("GCD of " + str(orig_a) + " and " + str(orig_b) + ": " + str(a))
        except:
            print("Invalid input")

    elif n == 21:
        print("Question Marks Puzzle")
        print("-" * 30)
        s = next_input("aa6???9")
        print("Input: '" + s + "'")
        print()
        prev_digit = None
        qmarks = 0
        found_pair = False
        valid = True
        for char in s:
            if char.isdigit():
                d = int(char)
                if prev_digit is not None and prev_digit + d == 10:
                    found_pair = True
                    if qmarks != 3:
                        valid = False
                prev_digit = d
                qmarks = 0
            elif char == '?':
                qmarks += 1
        if found_pair and valid:
            print("Result: TRUE")
        else:
            print("Result: FALSE")

    elif n == 22:
        print("Prime Number Checker")
        print("-" * 30)
        num_str = next_input("17")
        try:
            num = int(num_str)
            if num < 2:
                print(str(num) + " is NOT prime")
            else:
                is_prime = True
                for i in range(2, int(math.sqrt(num)) + 1):
                    if num % i == 0:
                        is_prime = False
                        break
                if is_prime:
                    print(str(num) + " is PRIME")
                else:
                    print(str(num) + " is NOT prime")
        except:
            print("Invalid input")

    elif n == 23:
        print("Dark Outside?")
        print("-" * 30)
        hour_str = next_input("20")
        tz = next_input("Eastern").lower()
        print("Available timezones: eastern, central, mountain, pacific")
        try:
            hour = int(hour_str)
            if hour < 0 or hour > 23:
                hour = hour % 24
            hour_12 = hour % 12 if hour % 12 != 0 else 12
            am_pm = "AM" if hour < 12 else "PM"
            print("Hour: " + str(hour_12) + " " + am_pm + " (" + tz.capitalize() + ")")
            print()
            if hour >= 18 or hour < 6:
                print("It is DARK outside")
            else:
                print("It is LIGHT outside")
        except:
            print("Invalid hour")

    elif n == 24:
        print("Target Text Matching")
        print("-" * 30)
        target = next_input("HELLO")
        if len(target) > 10:
            target = target[:10]
        print("Target: '" + target + "'")
        print()
        chars = string.ascii_uppercase + string.ascii_lowercase + string.digits + " !@#$%"
        attempt = ''.join(random.choice(chars) for _ in range(len(target)))
        generation = 0
        while attempt != target and generation < 500:
            new_attempt = ""
            for i in range(len(target)):
                if attempt[i] == target[i]:
                    new_attempt += target[i]
                else:
                    new_attempt += random.choice(chars)
            attempt = new_attempt
            generation += 1
        print("Final attempt: " + attempt)
        print("Matched in " + str(generation) + " generations!")

    elif n == 25:
        print("Heads or Tails")
        print("-" * 30)
        choice = next_input("Heads").lower()
        flip = random.choice(["heads", "tails"])
        print("Your choice: " + choice.title())
        print("Flipped: " + flip.title())
        print()
        if choice == flip:
            print("YOU WIN!")
        else:
            print("YOU LOSE!")

    elif n == 26:
        print("Quadratic Equation Solver")
        print("-" * 30)
        a_str = next_input("1")
        b_str = next_input("-5")
        c_str = next_input("6")
        try:
            a = float(a_str)
            b = float(b_str)
            c = float(c_str)
            print("Equation: " + str(a) + "x^2 + " + str(b) + "x + " + str(c) + " = 0")
            discriminant = b**2 - 4*a*c
            print("Discriminant: " + str(discriminant))
            print()
            if discriminant > 0:
                x1 = (-b + math.sqrt(discriminant)) / (2*a)
                x2 = (-b - math.sqrt(discriminant)) / (2*a)
                print("Two real roots:")
                print("  x1 = " + str(round(x1, 4)))
                print("  x2 = " + str(round(x2, 4)))
            elif discriminant == 0:
                x = -b / (2*a)
                print("One real root: x = " + str(round(x, 4)))
            else:
                x1 = (-b + cmath.sqrt(discriminant)) / (2*a)
                x2 = (-b - cmath.sqrt(discriminant)) / (2*a)
                print("Two complex roots:")
                print("  x1 = " + str(x1))
                print("  x2 = " + str(x2))
        except:
            print("Invalid coefficients")

    elif n == 27:
        wires = ["red", "blue", "green", "yellow", "orange"]
        correct_wire = random.choice(wires)
        codename = next_input("Agent")
        passcode = next_input("Encryption")
        action = next_input("defuse").lower().strip()
        wire_choice = next_input("red").lower().strip()
        print("=" * 50)
        print("  STORY: TOP SECRET MISSION")
        print("=" * 50)
        print("")
        print("It's 9:30 PM, dark and foggy...")
        print("")
        print("You arrive at an abandoned amusement park.")
        print("")
        print("-" * 30)
        print("")
        print("A shadowy figure emerges from the mist...")
        print("")
        print("Contact: 'Who are you?'")
        print("")
        print("You: '" + codename + "'")
        print("")
        print("Contact: 'Ah, " + codename + "! I've been expecting you.'")
        print("")
        print("Contact: 'What is the passcode?'")
        print("")
        print("You: '" + passcode + "'")
        print("")
        if passcode.lower().strip() != "encryption":
            print("Contact: 'Wrong passcode!'")
            print("")
            print("Alarms begin blaring...")
            print("")
            print("Security forces surround you!")
            print("")
            print("=" * 50)
            print("  MISSION FAILED!")
            print("  Invalid passcode.")
            print("=" * 50)
        else:
            print("Contact: 'Correct. Welcome, Agent.'")
            print("")
            print("-" * 30)
            print("  MISSION BRIEFING")
            print("-" * 30)
            print("")
            print("Intel has confirmed a nuclear device")
            print("hidden in an Alaskan facility.")
            print("")
            print("Your mission: Infiltrate and neutralize.")
            print("")
            print("-" * 30)
            print("")
            print("Day 4...")
            print("")
            print("You parachute into the frozen wilderness...")
            print("")
            print("After hours of infiltration...")
            print("")
            print("You find the nuclear device!")
            print("")
            print("The timer reads: 00:05")
            print("")
            print("FIVE SECONDS REMAINING!")
            print("")
            print("What do you do? (run / defuse)")
            print("")
            print("Your choice: " + action)
            print("")
            if action == "run":
                print("You turn and run for the exit...")
                print("")
                print("3...")
                print("")
                print("2...")
                print("")
                print("1...")
                print("")
                print(">>> BOOOOOOM! <<<")
                print("")
                print("The facility is vaporized.")
                print("")
                print("=" * 50)
                print("  MISSION FAILED!")
                print("  You should have defused the bomb.")
                print("=" * 50)
            elif action == "defuse":
                print("You approach the device...")
                print("")
                print("The bomb panel opens, revealing 5 wires:")
                print("")
                print("  [RED] [BLUE] [GREEN] [YELLOW] [ORANGE]")
                print("")
                print("00:04...")
                print("")
                print("Which wire do you cut?")
                print("")
                print("Your choice: " + wire_choice.upper())
                print("")
                print("00:03...")
                print("")
                print("You cut the " + wire_choice.upper() + " wire...")
                print("")
                print("00:02...")
                print("")
                if wire_choice == correct_wire:
                    print("...")
                    print("")
                    print("The timer STOPS!")
                    print("")
                    print("00:01 frozen on the display.")
                    print("")
                    print("=" * 50)
                    print("  MISSION ACCOMPLISHED!")
                    print("  You saved millions of lives.")
                    print("  The world will never know your name,")
                    print("  but they owe you everything.")
                    print("=" * 50)
                    print("")
                    print("Congratulations, " + codename + "!")
                else:
                    print("BEEP BEEP BEEP!")
                    print("")
                    print("WRONG WIRE!")
                    print("")
                    print("00:01...")
                    print("")
                    print(">>> BOOOOOOM! <<<")
                    print("")
                    print("=" * 50)
                    print("  MISSION FAILED!")
                    print("  The correct wire was " + correct_wire.upper() + ".")
                    print("=" * 50)
            else:
                print("You hesitate, unsure what to do...")
                print("")
                print("00:04...")
                print("")
                print("00:03...")
                print("")
                print("00:02...")
                print("")
                print("00:01...")
                print("")
                print(">>> BOOOOOOM! <<<")
                print("")
                print("=" * 50)
                print("  MISSION FAILED!")
                print("  Indecision is deadly.")
                print("=" * 50)

def main():
    global inputs, idx
    idx = 0
    try:
        raw = sys.stdin.read().strip()
        inputs = [line.strip() for line in raw.splitlines() if line.strip()] if raw else []
    except:
        inputs = []
    if not inputs:
        show_menu()
        return
    try:
        choice = int(inputs[0])
        idx = 1
    except:
        show_menu()
        print()
        print("Invalid: '" + str(inputs[0]) + "'")
        return
    if 1 <= choice <= 27:
        run_challenge(choice)
    else:
        show_menu()
        print()
        print("Invalid choice: " + str(choice))
    sys.stdout.flush()

if __name__ == "__main__":
    main()
`;

export const javaCode = `import java.util.Scanner;
import java.util.Random;
import java.util.ArrayList;

public class Main {
    static Scanner sc = new Scanner(System.in);
    static Random rand = new Random();
    static ArrayList<String> inputs = new ArrayList<>();
    static int idx = 0;

    static String[] projects = {
        "", "Weight Converter", "Driving Cost Calculator", "Rounding Demo",
        "Heads or Tails", "Random Element", "Matrix Keywords",
        "Connect Four", "Circle Overlap", "Pentagon Area",
        "SSN Validator", "Character Limit", "Tuition Calculator",
        "Max Digit Occurrence", "Array Summation", "Return Demo",
        "Factorial", "GPS Program"
    };

    static String nextInput(String def) {
        if (idx < inputs.size()) {
            return inputs.get(idx++);
        }
        return def;
    }

    public static void main(String[] args) {
        while (sc.hasNextLine()) {
            String line = sc.nextLine().trim();
            if (!line.isEmpty()) {
                inputs.add(line);
            }
        }

        if (inputs.isEmpty()) {
            showMenu();
            return;
        }

        int choice;
        try {
            choice = Integer.parseInt(inputs.get(0));
            idx = 1;
        } catch (Exception e) {
            showMenu();
            System.out.println();
            System.out.println("Invalid: '" + inputs.get(0) + "'");
            return;
        }

        if (choice < 1 || choice > 17) {
            showMenu();
            System.out.println();
            System.out.println("Invalid choice: " + choice);
            return;
        }

        System.out.println();
        System.out.println(">>> PROJECT " + choice + ": " + projects[choice].toUpperCase() + " <<<");
        System.out.println();

        switch (choice) {
            case 1: weightConverter(); break;
            case 2: drivingCost(); break;
            case 3: roundingDemo(); break;
            case 4: headsOrTails(); break;
            case 5: randomElement(); break;
            case 6: matrixKeywords(); break;
            case 7: connectFour(); break;
            case 8: circleOverlap(); break;
            case 9: pentagonArea(); break;
            case 10: ssnValidator(); break;
            case 11: characterLimit(); break;
            case 12: tuitionCalculator(); break;
            case 13: maxDigitOccurrence(); break;
            case 14: arraySummation(); break;
            case 15: returnDemo(); break;
            case 16: factorial(); break;
            case 17: gpsProgram(); break;
        }
    }

    static void showMenu() {
        System.out.println("============================================================");
        System.out.println("  HAAS HALL ACADEMY - JAVA AP COMPUTER SCIENCE");
        System.out.println("============================================================");
        System.out.println();
        System.out.println("  1. Weight Converter        10. SSN Validator");
        System.out.println("  2. Driving Cost Calculator 11. Character Limit");
        System.out.println("  3. Rounding Demo           12. Tuition Calculator");
        System.out.println("  4. Heads or Tails          13. Max Digit Occurrence");
        System.out.println("  5. Random Element          14. Array Summation");
        System.out.println("  6. Matrix Keywords         15. Return Statement Demo");
        System.out.println("  7. Connect Four            16. Factorial Calculator");
        System.out.println("  8. Circle Overlap          17. GPS Program");
        System.out.println("  9. Pentagon Area");
        System.out.println();
        System.out.println("------------------------------------------------------------");
        System.out.println("Enter a number (1-17) to run a project");
    }

    static void weightConverter() {
        System.out.println("==================================================");
        System.out.println("  UNIVERSAL WEIGHT CONVERTER");
        System.out.println("==================================================");
        System.out.println();
        System.out.println("Available units:");
        System.out.println("  [lbs] Pounds        [kg]  Kilograms");
        System.out.println("  [oz]  Ounces        [g]   Grams");
        System.out.println("  [st]  Stone         [mg]  Milligrams");
        System.out.println("  [ton] Metric Tons   [lb]  Pounds (alt)");
        System.out.println();
        System.out.println("--------------------------------------------------");
        System.out.println();
        String valueStr = nextInput("100");
        String from = nextInput("lbs").toLowerCase();
        String to = nextInput("kg").toLowerCase();
        System.out.println();
        double value = Double.parseDouble(valueStr);
        System.out.println("Converting: " + value + " " + from.toUpperCase());
        System.out.println("Target unit: " + to.toUpperCase());
        System.out.println();
        double result = convertWeight(value, from, to);
        System.out.println("--------------------------------------------------");
        System.out.println();
        System.out.println("  RESULT: " + String.format("%.4f", value) + " " + from + " = " + String.format("%.4f", result) + " " + to);
        System.out.println();
        System.out.println("--------------------------------------------------");
        System.out.println();
        System.out.println("ALL CONVERSIONS:");
        System.out.println("  " + String.format("%.4f", value) + " " + from + " equals:");
        System.out.println("    Pounds (lbs):     " + String.format("%.4f", convertWeight(value, from, "lbs")));
        System.out.println("    Kilograms (kg):   " + String.format("%.4f", convertWeight(value, from, "kg")));
        System.out.println("    Ounces (oz):      " + String.format("%.4f", convertWeight(value, from, "oz")));
        System.out.println("    Grams (g):        " + String.format("%.4f", convertWeight(value, from, "g")));
        System.out.println("    Stone (st):       " + String.format("%.4f", convertWeight(value, from, "st")));
        System.out.println("    Milligrams (mg):  " + String.format("%.0f", convertWeight(value, from, "mg")));
    }

    static double convertWeight(double value, String from, String to) {
        if (from.equals("lb")) from = "lbs";
        if (to.equals("lb")) to = "lbs";
        double toGrams = 0;
        switch (from) {
            case "lbs": toGrams = value * 453.592; break;
            case "kg": toGrams = value * 1000; break;
            case "oz": toGrams = value * 28.3495; break;
            case "g": toGrams = value; break;
            case "st": toGrams = value * 6350.29; break;
            case "mg": toGrams = value / 1000; break;
            case "ton": toGrams = value * 1000000; break;
            default: return 0;
        }
        switch (to) {
            case "lbs": return toGrams / 453.592;
            case "kg": return toGrams / 1000;
            case "oz": return toGrams / 28.3495;
            case "g": return toGrams;
            case "st": return toGrams / 6350.29;
            case "mg": return toGrams * 1000;
            case "ton": return toGrams / 1000000;
            default: return 0;
        }
    }

    static void drivingCost() {
        System.out.println("Driving Cost Calculator");
        System.out.println("--------------------------------------------");
        double miles = Double.parseDouble(nextInput("100"));
        double gallons = Double.parseDouble(nextInput("5"));
        double price = Double.parseDouble(nextInput("3.50"));
        System.out.println();
        double mpg = miles / gallons;
        double cost = gallons * price;
        System.out.println("Miles per gallon: " + String.format("%.2f", mpg));
        System.out.println("Total cost: $" + String.format("%.2f", cost));
    }

    static void roundingDemo() {
        System.out.println("Rounding Demo");
        System.out.println("--------------------------------------------");
        double num = 3.1254555555555;
        System.out.println("Original: " + num);
        System.out.println("2 decimals: " + String.format("%.2f", num));
        System.out.println("Floor: " + (int)Math.floor(num));
        System.out.println("Ceil: " + (int)Math.ceil(num));
        System.out.println("Round: " + Math.round(num));
    }

    static void headsOrTails() {
        System.out.println("Heads or Tails");
        System.out.println("--------------------------------------------");
        String guess = nextInput("heads").toLowerCase().trim();
        String result = rand.nextBoolean() ? "heads" : "tails";
        System.out.println();
        System.out.println("Your guess: " + guess.toUpperCase());
        System.out.println("Flipping...");
        System.out.println("Result: " + result.toUpperCase() + "!");
        System.out.println();
        if (guess.equals(result)) {
            System.out.println("YOU WIN!");
        } else {
            System.out.println("YOU LOSE!");
        }
    }

    static void randomElement() {
        System.out.println("==================================================");
        System.out.println("  RANDOM ELEMENT SELECTOR");
        System.out.println("==================================================");
        System.out.println();
        System.out.println("Enter 5 items to randomly select from:");
        System.out.println();
        ArrayList<String> items = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            String item = nextInput("");
            if (!item.isEmpty()) {
                items.add(item);
                System.out.println("  Item " + (i + 1) + ": " + item);
            }
        }
        if (items.isEmpty()) {
            System.out.println("  (Using default items...)");
            items.add("Apple");
            items.add("Banana");
            items.add("Cherry");
            items.add("Date");
            items.add("Elderberry");
        }
        System.out.println();
        System.out.println("--------------------------------------------------");
        System.out.println();
        System.out.println("Your items (" + items.size() + " total):");
        for (int i = 0; i < items.size(); i++) {
            System.out.println("  [" + (i + 1) + "] " + items.get(i));
        }
        System.out.println();
        System.out.println("--------------------------------------------------");
        System.out.println();
        System.out.println("Shuffling...");
        System.out.println();
        System.out.println("Selecting random element...");
        System.out.println();
        String selected = items.get(rand.nextInt(items.size()));
        int selectedIndex = items.indexOf(selected) + 1;
        System.out.println("==================================================");
        System.out.println("  SELECTED: " + selected + " (Item #" + selectedIndex + ")");
        System.out.println("==================================================");
    }

    static void matrixKeywords() {
        System.out.println("==================================================");
        System.out.println("  THE MATRIX - SYSTEM BREACH");
        System.out.println("==================================================");
        System.out.println();
        System.out.println("REBOOTING SYSTEMS...");
        System.out.println();
        System.out.println("WARNING: CONNECTION NOT SECURE");
        System.out.println();
        System.out.println("--------------------------------------------------");
        System.out.println();
        System.out.println("Wake up, User...");
        System.out.println();
        System.out.println("The Matrix has you...");
        System.out.println();
        System.out.println("--------------------------------------------------");
        System.out.println();
        for (int i = 0; i < 5; i++) {
            StringBuilder line = new StringBuilder();
            for (int j = 0; j < 40; j++) {
                line.append(rand.nextInt(2));
            }
            System.out.println(line);
            System.out.println();
        }
        System.out.println("--------------------------------------------------");
        System.out.println();
        System.out.println("Follow the white rabbit.");
        System.out.println();
        System.out.println("Knock, knock, Neo.");
        System.out.println();
        System.out.println("--------------------------------------------------");
        System.out.println();
        System.out.println("JAVA KEYWORDS DETECTED IN THE MATRIX:");
        String[] keywords = {"public", "static", "void", "class", "new", "return", "if", "else", "for", "while"};
        for (String kw : keywords) {
            System.out.println("  > " + kw);
        }
        System.out.println();
        System.out.println("The Matrix is everywhere...");
    }

    static void connectFour() {
        System.out.println("==================================================");
        System.out.println("  CONNECT FOUR");
        System.out.println("==================================================");
        System.out.println();
        System.out.println("Get 4 in a row to win!");
        System.out.println();
        char[][] board = new char[6][7];
        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 7; j++) {
                board[i][j] = '.';
            }
        }
        char player = 'X';
        for (int attempt = 0; attempt < 10; attempt++) {
            System.out.println("Player " + player + " turn. Column choice:");
            String colStr = nextInput("4");
            if (colStr.isEmpty()) break;
            int col = -1;
            try {
                col = Integer.parseInt(colStr.trim()) - 1;
            } catch (Exception e) {
                System.out.println("  Invalid.");
                continue;
            }
            if (col < 0 || col > 6) {
                System.out.println("  Out of range.");
                continue;
            }
            boolean placed = false;
            for (int i = 5; i >= 0; i--) {
                if (board[i][col] == '.') {
                    board[i][col] = player;
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                System.out.println("  Column full.");
                continue;
            }
            System.out.println("  " + player + " -> Col " + (col + 1));
            if (checkWin(board, player)) {
                System.out.println();
                printBoard(board);
                System.out.println();
                System.out.println("==================================================");
                System.out.println("  PLAYER " + player + " WINS!");
                System.out.println("==================================================");
                return;
            }
            player = (player == 'X') ? 'O' : 'X';
        }
        System.out.println();
        printBoard(board);
        System.out.println();
        System.out.println("==================================================");
        System.out.println("  Game ended after 10 moves.");
        System.out.println("==================================================");
    }

    static void printBoard(char[][] board) {
        System.out.println("    1   2   3   4   5   6   7");
        System.out.println("  +---+---+---+---+---+---+---+");
        for (int i = 0; i < 6; i++) {
            System.out.print("  |");
            for (int j = 0; j < 7; j++) {
                char c = board[i][j];
                if (c == 'X') {
                    System.out.print(" X |");
                } else if (c == 'O') {
                    System.out.print(" O |");
                } else {
                    System.out.print("   |");
                }
            }
            System.out.println();
            System.out.println("  +---+---+---+---+---+---+---+");
        }
    }

    static boolean checkWin(char[][] board, char p) {
        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 4; j++) {
                if (board[i][j] == p && board[i][j+1] == p && board[i][j+2] == p && board[i][j+3] == p) return true;
            }
        }
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 7; j++) {
                if (board[i][j] == p && board[i+1][j] == p && board[i+2][j] == p && board[i+3][j] == p) return true;
            }
        }
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 4; j++) {
                if (board[i][j] == p && board[i+1][j+1] == p && board[i+2][j+2] == p && board[i+3][j+3] == p) return true;
            }
        }
        for (int i = 3; i < 6; i++) {
            for (int j = 0; j < 4; j++) {
                if (board[i][j] == p && board[i-1][j+1] == p && board[i-2][j+2] == p && board[i-3][j+3] == p) return true;
            }
        }
        return false;
    }

    static void circleOverlap() {
        System.out.println("Circle Overlap Checker");
        System.out.println("--------------------------------------------");
        System.out.println("CIRCLE #1");
        double x1 = Double.parseDouble(nextInput("0"));
        double y1 = Double.parseDouble(nextInput("0"));
        double r1 = Double.parseDouble(nextInput("5"));
        System.out.println("  Center: (" + x1 + ", " + y1 + "), Radius: " + r1);
        System.out.println("CIRCLE #2");
        double x2 = Double.parseDouble(nextInput("3"));
        double y2 = Double.parseDouble(nextInput("0"));
        double r2 = Double.parseDouble(nextInput("3"));
        System.out.println("  Center: (" + x2 + ", " + y2 + "), Radius: " + r2);
        System.out.println();
        double dist = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
        System.out.println("Distance between centers: " + String.format("%.2f", dist));
        if (dist <= Math.abs(r1 - r2)) {
            System.out.println("One circle is INSIDE the other");
        } else if (dist <= r1 + r2) {
            System.out.println("Circles OVERLAP");
        } else {
            System.out.println("Circles do NOT overlap");
        }
    }

    static void pentagonArea() {
        System.out.println("Pentagon Area Calculator");
        System.out.println("--------------------------------------------");
        double r = Double.parseDouble(nextInput("5"));
        double side = 2 * r * Math.sin(Math.PI / 5);
        double area = (5 * side * side) / (4 * Math.tan(Math.PI / 5));
        System.out.println();
        System.out.println("Radius (center to vertex): " + r);
        System.out.println("Side length: " + String.format("%.4f", side));
        System.out.println("Area: " + String.format("%.4f", area));
    }

    static void ssnValidator() {
        System.out.println("SSN Validator");
        System.out.println("--------------------------------------------");
        String ssn = nextInput("123-45-6789");
        System.out.println();
        System.out.println("Input: " + ssn);
        if (ssn.matches("\\\\d{3}-\\\\d{2}-\\\\d{4}")) {
            System.out.println("VALID SSN format");
        } else if (ssn.matches("\\\\d{9}")) {
            System.out.println("Valid digits, but missing hyphens");
        } else {
            System.out.println("INVALID SSN format");
        }
    }

    static void characterLimit() {
        System.out.println("Character Limit Checker");
        System.out.println("--------------------------------------------");
        String text = nextInput("Hello World");
        int limit = Integer.parseInt(nextInput("20"));
        System.out.println();
        System.out.println("Text: '" + text + "'");
        System.out.println("Length: " + text.length() + " characters");
        System.out.println("Limit: " + limit);
        if (text.length() <= limit) {
            System.out.println("Result: Within limit");
        } else {
            System.out.println("Result: EXCEEDS limit by " + (text.length() - limit));
        }
    }

    static void tuitionCalculator() {
        System.out.println("Tuition Calculator");
        System.out.println("--------------------------------------------");
        double tuition = Double.parseDouble(nextInput("10000"));
        double increase = Double.parseDouble(nextInput("0.05"));
        int years = Integer.parseInt(nextInput("4"));
        System.out.println();
        double total = 0;
        double current = tuition;
        for (int i = 1; i <= years; i++) {
            System.out.println("Year " + i + ": $" + String.format("%,.2f", current));
            total += current;
            current *= (1 + increase);
        }
        System.out.println();
        System.out.println("Total cost over " + years + " years: $" + String.format("%,.2f", total));
    }

    static void maxDigitOccurrence() {
        System.out.println("Max Digit Occurrence");
        System.out.println("--------------------------------------------");
        String num = nextInput("1223334444");
        int[] counts = new int[10];
        for (char c : num.toCharArray()) {
            if (Character.isDigit(c)) {
                counts[c - '0']++;
            }
        }
        int maxDigit = 0, maxCount = 0;
        for (int i = 0; i < 10; i++) {
            if (counts[i] > maxCount) {
                maxCount = counts[i];
                maxDigit = i;
            }
        }
        System.out.println();
        System.out.println("Number: " + num);
        System.out.println("The digit " + maxDigit + " appears " + maxCount + " times");
    }

    static void arraySummation() {
        System.out.println("Array Summation Demo");
        System.out.println("--------------------------------------------");
        String row1 = nextInput("1,2,3,4,5");
        String row2 = nextInput("6,7,8,9,10");
        System.out.println();
        int sum = 0;
        System.out.println("Row 1: " + row1);
        for (String s : row1.split(",")) {
            try {
                sum += Integer.parseInt(s.trim());
            } catch (Exception e) {}
        }
        System.out.println("Row 2: " + row2);
        for (String s : row2.split(",")) {
            try {
                sum += Integer.parseInt(s.trim());
            } catch (Exception e) {}
        }
        System.out.println();
        System.out.println("Total sum: " + sum);
    }

    static void returnDemo() {
        System.out.println("Return Statement Demo");
        System.out.println("--------------------------------------------");
        int x = 10;
        System.out.println("Starting value: " + x);
        for (int i = 1; i <= 3; i++) {
            x = x * 10;
            System.out.println("  After multiply #" + i + ": " + x);
        }
        int y = x / 10;
        System.out.println("After dividing by 10: " + y);
    }

    static void factorial() {
        System.out.println("Factorial Calculator");
        System.out.println("--------------------------------------------");
        int n = Integer.parseInt(nextInput("5"));
        if (n > 20) n = 20;
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        System.out.println();
        System.out.println(n + "! = " + result);
    }

    static void gpsProgram() {
        System.out.println("GPS Program");
        System.out.println("--------------------------------------------");
        double lat1 = Double.parseDouble(nextInput("36.0679"));
        double lon1 = Double.parseDouble(nextInput("-94.1737"));
        double lat2 = Double.parseDouble(nextInput("36.1540"));
        double lon2 = Double.parseDouble(nextInput("-95.9928"));
        double R = 6371.0;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.pow(Math.sin(dLat/2), 2) +
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                   Math.pow(Math.sin(dLon/2), 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        double distance = R * c;
        double y = Math.sin(dLon) * Math.cos(Math.toRadians(lat2));
        double x = Math.cos(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2)) -
                   Math.sin(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(dLon);
        double bearing = (Math.toDegrees(Math.atan2(y, x)) + 360) % 360;
        String direction;
        if (bearing >= 337.5 || bearing < 22.5) direction = "North";
        else if (bearing < 67.5) direction = "Northeast";
        else if (bearing < 112.5) direction = "East";
        else if (bearing < 157.5) direction = "Southeast";
        else if (bearing < 202.5) direction = "South";
        else if (bearing < 247.5) direction = "Southwest";
        else if (bearing < 292.5) direction = "West";
        else direction = "Northwest";
        System.out.println();
        System.out.println("Distance: " + String.format("%.2f", distance) + " km");
        System.out.println("Bearing: " + String.format("%.2f", bearing) + " degrees");
        System.out.println("Direction: " + direction);
    }
}
`;

export const cppCode = `#include <iostream>
#include <iomanip>
#include <cmath>
#include <string>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <algorithm>
#include <sstream>

using namespace std;

vector<string> inputs;
int idx = 0;

string nextInput(string def) {
    if (idx < (int)inputs.size()) {
        return inputs[idx++];
    }
    return def;
}

void showMenu() {
    cout << "============================" << endl;
    cout << "   University of Arkansas Fall 2023" << endl;
    cout << "   C++ Programming Foundations I" << endl;
    cout << "============================" << endl;
    cout << "  1. Bike Race Calculator Tool" << endl;
    cout << "  2. Scamazon Product Checkout" << endl;
    cout << "  3. Scientific Calculator Suite" << endl;
    cout << endl;
    cout << "Enter a number (1-3) to run a project" << endl;
}

void bikeRace() {
    cout << "Bike Race Calculator Tool" << endl;
    cout << "--------------------------------------------" << endl;

    string userName = nextInput("Racer");
    double userDist = stod(nextInput("42"));
    double userTime = stod(nextInput("1.5"));

    cout << "Your name: " << userName << endl;
    cout << "Distance: " << userDist << " km" << endl;
    cout << "Time: " << userTime << " hours" << endl;
    cout << endl;

    double userSpeed = userDist / userTime;
    cout << "Your speed: " << fixed << setprecision(2) << userSpeed << " km/h" << endl;
    cout << endl;

    int waterStations = (int)(userDist / 10);
    double bikeTire_diameter_mm = 622;
    double Pi_Approx = 3.14159;
    double bikeTire_circ = bikeTire_diameter_mm * Pi_Approx;
    double pedalTo_wheel = 1.6;
    double raceLength_mm = userDist * 1000000;
    double pedalTimes = raceLength_mm / (bikeTire_circ * pedalTo_wheel);

    cout << "Race Info:" << endl;
    cout << "  Water stations needed: " << waterStations << endl;
    cout << "  Tire circumference: " << fixed << setprecision(2) << bikeTire_circ << " mm" << endl;
    cout << "  Pedal rotations: " << fixed << setprecision(0) << pedalTimes << endl;
    cout << endl;

    vector<string> names = {"Alice", "Bob", "Charlie", "Diana", userName};
    vector<double> distances = {42.5, 38.2, 45.0, 40.8, userDist};
    vector<double> times = {1.5, 1.4, 1.8, 1.6, userTime};

    cout << "Leaderboard:" << endl;
    int userRank = 1;
    for (int i = 0; i < 5; i++) {
        double speed = distances[i] / times[i];
        cout << "  " << names[i] << ": " << fixed << setprecision(2) << speed << " km/h" << endl;
        if (speed > userSpeed && i < 4) userRank++;
    }
    cout << endl;
    cout << "Your rank: #" << userRank << " out of 5" << endl;
}

void scamazon() {
    string products[] = {
        "USB-C Hub 7-in-1", "Wireless Mouse", "Mechanical Keyboard", "4K Webcam", "Gaming Monitor",
        "Laptop Stand", "Ring Light", "Bluetooth Earbuds", "External SSD 1TB", "Portable Charger",
        "HDMI Cable 6ft", "USB Flash Drive 64GB", "Microphone", "Graphics Tablet", "Raspberry Pi Kit"
    };
    double prices[] = {
        29.99, 24.99, 89.99, 79.99, 299.99,
        39.99, 34.99, 49.99, 109.99, 29.99,
        12.99, 9.99, 129.99, 69.99, 74.99
    };

    string choiceStr = nextInput("a");
    char choice = (!choiceStr.empty()) ? tolower(choiceStr[0]) : 'a';

    string item;
    double unitPrice = 0;
    if (choice >= 'a' && choice <= 'o') {
        item = products[choice - 'a'];
        unitPrice = prices[choice - 'a'];
    } else {
        item = "Mystery Box";
        unitPrice = 49.99;
    }

    int qty = stoi(nextInput("1"));
    if (qty < 1) qty = 1;
    if (qty > 10) qty = 10;

    double balance = stod(nextInput("500"));
    double shippingCost = stod(nextInput("5.99"));
    double tipPercent = stod(nextInput("0"));
    double taxPercent = stod(nextInput("9.5"));

    string checkoutStr = nextInput("y");
    char checkout = (!checkoutStr.empty()) ? tolower(checkoutStr[0]) : 'n';

    string payMethod = nextInput("card");

    cout << "==========================================================" << endl;
    cout << "  SCAMAZON TECH SUPERSTORE - ORDER SUMMARY" << endl;
    cout << "==========================================================" << endl;
    cout << endl;
    cout << "  Item: " << item << endl;
    cout << "  Unit Price: $" << fixed << setprecision(2) << unitPrice << endl;
    cout << "  Quantity: " << qty << endl;
    cout << "  Your Balance: $" << fixed << setprecision(2) << balance << endl;
    cout << endl;

    double subtotal = unitPrice * qty;
    double taxAmount = subtotal * (taxPercent / 100.0);
    double tipAmount = subtotal * (tipPercent / 100.0);
    double total = subtotal + shippingCost + taxAmount + tipAmount;

    cout << "----------------------------------------------------------" << endl;
    cout << "  Subtotal:     $" << fixed << setprecision(2) << subtotal << endl;
    cout << "  Shipping:     $" << fixed << setprecision(2) << shippingCost << endl;
    cout << "  Tax (" << fixed << setprecision(1) << taxPercent << "%):    $" << fixed << setprecision(2) << taxAmount << endl;
    cout << "  Tip (" << fixed << setprecision(1) << tipPercent << "%):    $" << fixed << setprecision(2) << tipAmount << endl;
    cout << "----------------------------------------------------------" << endl;
    cout << "  TOTAL:        $" << fixed << setprecision(2) << total << endl;
    cout << "----------------------------------------------------------" << endl;
    cout << endl;

    if (checkout != 'y') {
        cout << "Order cancelled. Come back soon!" << endl;
        return;
    }

    cout << "Payment method: " << (payMethod == "cash" ? "CASH" : "CREDIT CARD") << endl;
    cout << endl;

    if (payMethod == "cash") {
        if (balance >= total) {
            double change = balance - total;
            cout << "  Cash tendered: $" << fixed << setprecision(2) << balance << endl;
            cout << "  Change due:    $" << fixed << setprecision(2) << change << endl;
            cout << endl;
            cout << "==========================================================" << endl;
            cout << "  ORDER CONFIRMED!" << endl;
            cout << "==========================================================" << endl;
        } else {
            double shortage = total - balance;
            cout << "  INSUFFICIENT FUNDS!" << endl;
            cout << "  You need $" << fixed << setprecision(2) << shortage << " more." << endl;
            cout << endl;
            cout << "==========================================================" << endl;
            cout << "  ORDER FAILED" << endl;
            cout << "==========================================================" << endl;
        }
    } else {
        cout << "  Card charged: $" << fixed << setprecision(2) << total << endl;
        if (total > balance) {
            double debt = total - balance;
            cout << "  WARNING: You are now in DEBT: $" << fixed << setprecision(2) << debt << endl;
        }
        cout << endl;
        cout << "==========================================================" << endl;
        cout << "  ORDER CONFIRMED!" << endl;
        cout << "==========================================================" << endl;
    }

    cout << endl;
    cout << "Thank you for shopping at Scamazon!" << endl;
}

void calculator() {
    cout << "==========================================================" << endl;
    cout << "  SCIENTIFIC CALCULATOR SUITE" << endl;
    cout << "==========================================================" << endl;
    cout << endl;

    string mode = nextInput("basic");
    for (int i = 0; i < (int)mode.length(); i++) {
        mode[i] = tolower(mode[i]);
    }
    cout << "Mode: " << mode << endl;
    cout << endl;

    if (mode == "basic") {
        cout << "----------------------------------------------------------" << endl;
        cout << "  BASIC ARITHMETIC" << endl;
        cout << "----------------------------------------------------------" << endl;
        cout << endl;
        string numStr1 = nextInput("10");
        string opStr = nextInput("+");
        string numStr2 = nextInput("5");
        double a = stod(numStr1);
        double b = stod(numStr2);
        char op = (!opStr.empty()) ? opStr[0] : '+';

        cout << "  Expression: " << a << " " << op << " " << b << endl;
        cout << endl;

        double result = 0;
        string error = "";
        if (op == '+') result = a + b;
        else if (op == '-') result = a - b;
        else if (op == '*' || op == 'x' || op == 'X') result = a * b;
        else if (op == '/') {
            if (b != 0) result = a / b;
            else error = "Division by zero!";
        }
        else if (op == '^') result = pow(a, b);
        else if (op == '%') {
            if (b != 0) result = fmod(a, b);
            else error = "Modulo by zero!";
        }
        else error = "Unknown operator: " + string(1, op);

        if (error.empty()) {
            cout << "  RESULT: " << fixed << setprecision(6) << result << endl;
        } else {
            cout << "  ERROR: " << error << endl;
        }
    }
    else if (mode == "sqrt" || mode == "root") {
        cout << "----------------------------------------------------------" << endl;
        cout << "  SQUARE & CUBE ROOTS" << endl;
        cout << "----------------------------------------------------------" << endl;
        cout << endl;
        double n = stod(nextInput("16"));
        cout << "  Input: " << n << endl;
        cout << endl;
        if (n >= 0) {
            cout << "  sqrt(" << n << ") = " << fixed << setprecision(6) << sqrt(n) << endl;
        } else {
            cout << "  sqrt(" << n << ") = " << sqrt(abs(n)) << "i (imaginary)" << endl;
        }
        cout << "  cbrt(" << n << ") = " << fixed << setprecision(6) << cbrt(n) << endl;
        if (n >= 0) {
            cout << "  4th root(" << n << ") = " << fixed << setprecision(6) << pow(n, 0.25) << endl;
        }
    }
    else if (mode == "trig") {
        cout << "----------------------------------------------------------" << endl;
        cout << "  TRIGONOMETRY (Input in degrees)" << endl;
        cout << "----------------------------------------------------------" << endl;
        cout << endl;
        double angle = stod(nextInput("45"));
        double rad = angle * 3.14159265358979 / 180.0;
        cout << "  Angle: " << angle << " degrees (" << fixed << setprecision(4) << rad << " radians)" << endl;
        cout << endl;
        cout << "  sin(" << angle << ") = " << fixed << setprecision(6) << sin(rad) << endl;
        cout << "  cos(" << angle << ") = " << fixed << setprecision(6) << cos(rad) << endl;
        double tanVal = tan(rad);
        if (abs(cos(rad)) < 0.0001) {
            cout << "  tan(" << angle << ") = undefined (asymptote)" << endl;
        } else {
            cout << "  tan(" << angle << ") = " << fixed << setprecision(6) << tanVal << endl;
        }
        cout << endl;
        cout << "  Inverse functions:" << endl;
        cout << "  asin(" << sin(rad) << ") = " << fixed << setprecision(2) << angle << " deg" << endl;
        cout << "  acos(" << cos(rad) << ") = " << fixed << setprecision(2) << angle << " deg" << endl;
    }
    else if (mode == "log") {
        cout << "----------------------------------------------------------" << endl;
        cout << "  LOGARITHMS & EXPONENTIALS" << endl;
        cout << "----------------------------------------------------------" << endl;
        cout << endl;
        double n = stod(nextInput("100"));
        cout << "  Input: " << n << endl;
        cout << endl;
        if (n > 0) {
            cout << "  log10(" << n << ") = " << fixed << setprecision(6) << log10(n) << endl;
            cout << "  ln(" << n << ")    = " << fixed << setprecision(6) << log(n) << endl;
            cout << "  log2(" << n << ")  = " << fixed << setprecision(6) << (log(n) / log(2)) << endl;
            cout << endl;
            cout << "  Exponentials:" << endl;
            cout << "  e^" << n << "      = " << scientific << setprecision(4) << exp(n) << endl;
            cout << "  10^" << fixed << setprecision(0) << n << "     = " << scientific << setprecision(4) << pow(10, n) << endl;
            cout << "  2^" << fixed << setprecision(0) << n << "      = " << scientific << setprecision(4) << pow(2, n) << endl;
        } else {
            cout << "  ERROR: Logarithm requires positive number!" << endl;
        }
    }
    else if (mode == "convert" || mode == "temp") {
        cout << "----------------------------------------------------------" << endl;
        cout << "  TEMPERATURE CONVERSION" << endl;
        cout << "----------------------------------------------------------" << endl;
        cout << endl;
        double temp = stod(nextInput("100"));
        string fromStr = nextInput("C");
        char from = (!fromStr.empty()) ? toupper(fromStr[0]) : 'C';
        string scaleName = (from == 'C') ? "Celsius" : (from == 'F') ? "Fahrenheit" : "Kelvin";
        cout << "  Input: " << temp << " " << scaleName << endl;
        cout << endl;

        double c, f, k;
        if (from == 'C') {
            c = temp;
            f = c * 9.0/5.0 + 32;
            k = c + 273.15;
        } else if (from == 'F') {
            f = temp;
            c = (f - 32) * 5.0/9.0;
            k = c + 273.15;
        } else {
            k = temp;
            c = k - 273.15;
            f = c * 9.0/5.0 + 32;
        }
        cout << "  Conversions:" << endl;
        cout << "  Celsius:    " << fixed << setprecision(2) << c << " C" << endl;
        cout << "  Fahrenheit: " << fixed << setprecision(2) << f << " F" << endl;
        cout << "  Kelvin:     " << fixed << setprecision(2) << k << " K" << endl;
    }
    else if (mode == "factorial" || mode == "fact") {
        cout << "----------------------------------------------------------" << endl;
        cout << "  FACTORIAL CALCULATOR" << endl;
        cout << "----------------------------------------------------------" << endl;
        cout << endl;
        int n = stoi(nextInput("5"));
        if (n < 0) n = 0;
        if (n > 20) n = 20;
        cout << "  Calculating " << n << "!" << endl;
        cout << endl;
        long long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        cout << "  " << n << "! = " << result << endl;
        cout << endl;
        cout << "  Step-by-step:" << endl;
        long long step = 1;
        for (int i = 1; i <= n; i++) {
            step *= i;
            cout << "    " << i << "! = " << step << endl;
        }
    }
    else if (mode == "constants" || mode == "const") {
        cout << "----------------------------------------------------------" << endl;
        cout << "  MATH CONSTANTS & FUNCTIONS" << endl;
        cout << "----------------------------------------------------------" << endl;
        cout << endl;
        double n = stod(nextInput("-3.7"));
        cout << "  Input value: " << n << endl;
        cout << endl;
        cout << "  Constants:" << endl;
        cout << "    pi = " << fixed << setprecision(10) << 3.14159265358979 << endl;
        cout << "    e  = " << fixed << setprecision(10) << 2.71828182845905 << endl;
        cout << endl;
        cout << "  Functions applied to " << n << ":" << endl;
        cout << "    abs(" << n << ")   = " << fixed << setprecision(4) << abs(n) << endl;
        cout << "    floor(" << n << ") = " << floor(n) << endl;
        cout << "    ceil(" << n << ")  = " << ceil(n) << endl;
        cout << "    round(" << n << ") = " << round(n) << endl;
        if (n != 0) cout << "    1/" << n << "      = " << fixed << setprecision(6) << 1.0/n << endl;
    }
    else if (mode == "quadratic" || mode == "quad") {
        cout << "----------------------------------------------------------" << endl;
        cout << "  QUADRATIC EQUATION SOLVER (ax^2 + bx + c = 0)" << endl;
        cout << "----------------------------------------------------------" << endl;
        cout << endl;
        double a = stod(nextInput("1"));
        double b = stod(nextInput("-5"));
        double c = stod(nextInput("6"));
        cout << "  Equation: " << a << "x^2 + " << b << "x + " << c << " = 0" << endl;
        cout << endl;
        double discriminant = b*b - 4*a*c;
        cout << "  Discriminant: " << discriminant << endl;
        cout << endl;
        if (discriminant > 0) {
            double x1 = (-b + sqrt(discriminant)) / (2*a);
            double x2 = (-b - sqrt(discriminant)) / (2*a);
            cout << "  Two real roots:" << endl;
            cout << "    x1 = " << fixed << setprecision(4) << x1 << endl;
            cout << "    x2 = " << fixed << setprecision(4) << x2 << endl;
        } else if (discriminant == 0) {
            double x = -b / (2*a);
            cout << "  One real root:" << endl;
            cout << "    x = " << fixed << setprecision(4) << x << endl;
        } else {
            double realPart = -b / (2*a);
            double imagPart = sqrt(-discriminant) / (2*a);
            cout << "  Two complex roots:" << endl;
            cout << "    x1 = " << fixed << setprecision(4) << realPart << " + " << imagPart << "i" << endl;
            cout << "    x2 = " << fixed << setprecision(4) << realPart << " - " << imagPart << "i" << endl;
        }
    }
    else {
        cout << "  Unknown mode: '" << mode << "'" << endl;
        cout << endl;
        cout << "  Available modes: basic, sqrt, trig, log, convert," << endl;
        cout << "                   factorial, constants, quadratic" << endl;
    }
    cout << endl;
    cout << "==========================================================" << endl;
}

int main() {
    srand(time(0));

    string line;
    while (getline(cin, line)) {
        if (!line.empty()) {
            inputs.push_back(line);
        }
    }

    if (inputs.empty()) {
        showMenu();
        return 0;
    }

    int choice;
    try {
        choice = stoi(inputs[0]);
        idx = 1;
    } catch (...) {
        showMenu();
        cout << endl;
        cout << "Invalid: '" << inputs[0] << "'" << endl;
        return 1;
    }

    if (choice < 1 || choice > 3) {
        showMenu();
        cout << endl;
        cout << "Invalid choice: " << choice << endl;
        return 1;
    }

    cout << endl;
    cout << ">>> PROJECT " << choice << " <<<" << endl;
    cout << endl;

    switch (choice) {
        case 1: bikeRace(); break;
        case 2: scamazon(); break;
        case 3: calculator(); break;
    }

    return 0;
}
`;
