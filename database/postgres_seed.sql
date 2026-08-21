-- ============================================
-- DSA Quest - PostgreSQL Demo Seed
-- ============================================

-- USERS
INSERT INTO users (id, name, email, password)
VALUES
    (1, 'Demo User', 'demo@dsaquest.com', '$2b$10$demo_hash_replace_later');


-- SHEETS
INSERT INTO sheets (id, title)
VALUES
    (1, 'Striver''s A2Z Sheet - Learn DSA from A to Z');


-- PATTERNS
INSERT INTO patterns
    (id, sheet_id, source_id, pattern_name, order_number)
VALUES
    (1, 1, 683, 'Learn the basics', 1),
    (2, 1, 686, 'Solve Problems on Arrays [Easy -> Medium -> Hard]', 2);


-- PROBLEMS
INSERT INTO problems (
    id,
    pattern_id,
    subcategory_name,
    problem_name,
    difficulty,
    official_article,
    recommended_article,
    official_youtube,
    recommended_youtube,
    official_leetcode,
    recommended_leetcode,
    plus,
    official_editorial,
    recommended_editorial,
    order_number
)
VALUES

-- ============================================
-- PATTERN 1 : Learn the basics
-- ============================================

(
    1, 1,
    'Things to Know in C++/Java/Python or any language',
    'Input Output',
    'Easy',
    'https://takeuforward.org/c/c-basic-input-output/',
    NULL,
    'https://youtu.be/EAR7De6Goz4?t=250',
    NULL, NULL, NULL,
    'https://takeuforward.org/plus/dsa/problems/input-output',
    'https://takeuforward.org/plus/dsa/problems/input-output?tab=editorial',
    NULL,
    1
),

(
    2, 1,
    'Things to Know in C++/Java/Python or any language',
    'Cpp Basics',
    'Easy',
    'https://takeuforward.org/data-structure/what-are-arrays-strings',
    NULL,
    'https://youtu.be/EAR7De6Goz4?t=2415',
    NULL, NULL, NULL,
    'https://takeuforward.org/plus/dsa/problems/cpp',
    'https://takeuforward.org/plus/dsa/problems/cpp',
    NULL,
    2
),

(
    3, 1,
    'Things to Know in C++/Java/Python or any language',
    'If ElseIf',
    'Easy',
    'https://takeuforward.org/if-else/if-else-statements/',
    NULL,
    'https://youtu.be/EAR7De6Goz4?t=1259',
    NULL, NULL, NULL,
    'https://takeuforward.org/plus/dsa/problems/if-elseif',
    'https://takeuforward.org/plus/dsa/problems/if-elseif?tab=editorial',
    NULL,
    3
),

(
    4, 1,
    'Things to Know in C++/Java/Python or any language',
    'Switch Case',
    'Easy',
    'https://takeuforward.org/switch-case/switch-case-statements/',
    NULL,
    'https://youtu.be/EAR7De6Goz4',
    NULL, NULL, NULL,
    'https://takeuforward.org/plus/dsa/problems/switch-case',
    'https://takeuforward.org/plus/dsa/problems/switch-case?tab=editorial',
    NULL,
    4
),

(
    5, 1,
    'Things to Know in C++/Java/Python or any language',
    'For loops',
    'Easy',
    'https://takeuforward.org/for-loop/understanding-for-loop/',
    NULL,
    'https://youtu.be/EAR7De6Goz4?t=3096',
    NULL, NULL, NULL,
    'https://takeuforward.org/plus/dsa/problems/for-loop',
    'https://takeuforward.org/plus/dsa/problems/for-loop',
    NULL,
    5
),


-- ============================================
-- PATTERN 3 : Arrays
-- ============================================

(
    6, 2,
    'Easy',
    'Find missing number',
    'Easy',
    'https://www.geeksforgeeks.org/find-the-missing-number/',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'https://takeuforward.org/plus/dsa/problems/find-missing-number',
    NULL,
    NULL,
    1
),

(
    7, 2,
    'Easy',
    'Maximum Consecutive Ones',
    'Easy',
    'https://takeuforward.org/data-structure/count-maximum-consecutive-ones-in-the-array/',
    NULL,
    'https://youtu.be/bYWLJb3vCWY?t=1124',
    NULL,
    'https://leetcode.com/problems/max-consecutive-ones/',
    NULL,
    'https://takeuforward.org/plus/dsa/problems/maximum-consecutive-ones',
    'https://takeuforward.org/plus/dsa/problems/maximum-consecutive-ones?tab=editorial',
    NULL,
    2
),

(
    8, 2,
    'Easy',
    'Find the number that appears once, and other numbers twice.',
    'Medium',
    'https://takeuforward.org/arrays/find-the-number-that-appears-once-and-the-other-numbers-twice/',
    NULL,
    'https://youtu.be/bYWLJb3vCWY?t=1369',
    NULL,
    'https://leetcode.com/problems/single-number/',
    NULL,
    'https://takeuforward.org/plus/dsa/problems/single-number---i',
    'https://takeuforward.org/plus/dsa/problems/single-number---i?tab=editorial',
    NULL,
    3
),

(
    9, 2,
    'Medium',
    'Rotate matrix by 90 degrees',
    'Medium',
    'https://takeuforward.org/data-structure/rotate-image-by-90-degree/',
    NULL,
    'https://youtu.be/Z0R2u6gd3GU',
    NULL,
    'https://leetcode.com/problems/rotate-image/',
    NULL,
    'https://takeuforward.org/plus/dsa/problems/rotate-matrix-by-90-degrees',
    'https://takeuforward.org/plus/dsa/problems/rotate-matrix-by-90-degrees?tab=editorial',
    NULL,
    4
);