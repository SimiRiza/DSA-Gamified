USE dsa_quest;

-- ============================================
-- SHEETS
-- ============================================

INSERT INTO sheets (name, description)
VALUES

(
'Striver A2Z',
'Most popular DSA roadmap'
),

(
'NeetCode 150',
'Popular interview preparation sheet'
);

-- ============================================
-- PATTERNS
-- ============================================

INSERT INTO patterns
(sheet_id, name, order_number)

VALUES

(1,'Arrays',1),
(1,'Binary Search',2),
(1,'Strings',3),
(1,'Linked List',4),
(1,'Trees',5),

(2,'Arrays & Hashing',1),
(2,'Two Pointers',2),
(2,'Stack',3),
(2,'Trees',4);

-- ============================================
-- PROBLEMS
-- ============================================

INSERT INTO problems
(pattern_id,title,difficulty,leetcode_url,youtube_url)

VALUES

(1,
'Two Sum',
'Easy',
'https://leetcode.com/problems/two-sum/',
'https://youtu.be/KLlXCFG5TnA'),

(1,
'Best Time to Buy and Sell Stock',
'Easy',
'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
'https://youtu.be/eMSfBgbiEjk'),

(1,
'Move Zeroes',
'Easy',
'https://leetcode.com/problems/move-zeroes/',
'https://youtu.be/WhUiAyi7CF8'),

(2,
'Binary Search',
'Easy',
'https://leetcode.com/problems/binary-search/',
'https://youtu.be/MfcharczukM'),

(2,
'Search Insert Position',
'Easy',
'https://leetcode.com/problems/search-insert-position/',
'https://youtu.be/K-RYzDZkzCI'),

(6,
'Contains Duplicate',
'Easy',
'https://leetcode.com/problems/contains-duplicate/',
'https://youtu.be/3OamzN90kPg'),

(6,
'Valid Anagram',
'Easy',
'https://leetcode.com/problems/valid-anagram/',
'https://youtu.be/9UtInBqnCgA'),

(7,
'Valid Palindrome',
'Easy',
'https://leetcode.com/problems/valid-palindrome/',
'https://youtu.be/jJXJ16kPFWg');