import type { DataStructure } from '../types';

export const learningsData: DataStructure = {
  sections: [
    {
      id: "array-l1",
      title: "Level 1 Array",
      icon: "🧮",
      description: "Fundamental array problems covering basic operations.",
      color: "#6366f1",
      learnings: [
        {
          id: "move-zeroes",
          title: "Move Zeroes",
          url: "https://leetcode.com/problems/move-zeroes",
          difficulty: "easy",
          tags: ["Array", "Two Pointers"],
          language: "cpp",
          code: `class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int n = nums.size();
        for(int i = 0, j = 0; i < n; i++) {
            if(nums[i] != 0) {
                swap(nums[i], nums[j++]);
            }
        }
    }
};`,
          commentary: `## Approach: Two Pointers\n\nThe key insight is to use **two pointers**...`, // (Truncated for brevity, paste full content)
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)"
        }
        // ... Add the rest of your data here
      ]
    },
    {
        id: "array-l2",
        title: "Level 2 Array",
        icon: "📊",
        description: "Intermediate array problems involving sliding window, prefix sums.",
        color: "#ec4899",
        learnings: [
             {
                id: "product-of-array-except-self",
                title: "Product of Array Except Self",
                url: "https://leetcode.com/problems/product-of-array-except-self/",
                difficulty: "medium",
                tags: ["Array", "Prefix Sum"],
                language: "cpp",
                code: `class Solution { ... }`, // Paste code
                commentary: `## Approach: Prefix and Suffix Products... \n\n $$result[i] = \\left(\\prod_{j=0}^{i-1} nums[j]\\right) \\times \\left(\\prod_{j=i+1}^{n-1} nums[j]\\right)$$`,
                timeComplexity: "O(n)",
                spaceComplexity: "O(1)"
             }
        ]
    }
    // ... Add other sections
  ]
};

// Helper functions refactored for TS
export const getSectionById = (id: string) => learningsData.sections.find(s => s.id === id);

export const getLearningById = (sectionId: string, learningId: string) => {
    const section = getSectionById(sectionId);
    return section?.learnings.find(l => l.id === learningId);
};

export const getTotalLearnings = () => 
    learningsData.sections.reduce((acc, curr) => acc + curr.learnings.length, 0);

export const getAdjacentLearnings = (sectionId: string, learningId: string) => {
    const section = getSectionById(sectionId);
    if (!section) return { prev: null, next: null };
    const index = section.learnings.findIndex(l => l.id === learningId);
    return {
        prev: index > 0 ? section.learnings[index - 1] : null,
        next: index < section.learnings.length - 1 ? section.learnings[index + 1] : null
    };
};
