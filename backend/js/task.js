/**
 * Task 1
 */
function leafFiles(files) {
  const parentIds = new Set(
    files.map(file => file.parent).filter(id => id !== -1)
  );

  const leafFiles = files.filter(file => !parentIds.has(file.id));

  return leafFiles.map(file => file.name);
}

/**
 * Task 1
 */
function kLargestCategories(files, k) {
  const categoryCounts = {};

  // Count the occurrences of each category
  files.forEach(file => {
    file.categories.forEach(category => {
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
  });

  // Convert the categoryCounts object to an array and sort it
  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => {
    // Sort by count in descending order, then alphabetically
    return b[1] - a[1] || a[0].localeCompare(b[0]);
  });

  // Extract the category names and limit to top k categories
  return sortedCategories.slice(0, k).map(entry => entry[0]);
}

/**
 * Task 1
 */

function largestFileSize(files) {
  if (files.length === 0) return 0;

  const fileMap = buildFileMap(files);
  let maxTotalSize = 0;

  fileMap.forEach((file, fileId) => {
    // Skip non-root files
    if (file.parent === -1) {
      const totalSize = calculateTotalSize(file, fileMap);
      if (totalSize > maxTotalSize) {
        maxTotalSize = totalSize;
      }
    }
  });

  return maxTotalSize;
}

function buildFileMap(files) {
  const fileMap = new Map();
  files.forEach(file => {
    file.children = [];
    fileMap.set(file.id, file);
  });
  files.forEach(file => {
    if (file.parent !== -1) {
      fileMap.get(file.parent).children.push(file);
    }
  });
  return fileMap;
}

function calculateTotalSize(file, fileMap) {
  let totalSize = file.size;
  file.children.forEach(child => {
    totalSize += calculateTotalSize(child, fileMap);
  });
  return totalSize;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const testFiles = [
  {
    id: 1,
    name: "Document.txt",
    categories: ["Documents"],
    parent: 3,
    size: 1024,
  },
  {
    id: 2,
    name: "Image.jpg",
    categories: ["Media", "Photos"],
    parent: 34,
    size: 2048,
  },
  { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
  {
    id: 5,
    name: "Spreadsheet.xlsx",
    categories: ["Documents", "Excel"],
    parent: 3,
    size: 4096,
  },
  {
    id: 8,
    name: "Backup.zip",
    categories: ["Backup"],
    parent: 233,
    size: 8192,
  },
  {
    id: 13,
    name: "Presentation.pptx",
    categories: ["Documents", "Presentation"],
    parent: 3,
    size: 3072,
  },
  {
    id: 21,
    name: "Video.mp4",
    categories: ["Media", "Videos"],
    parent: 34,
    size: 6144,
  },
  { id: 34, name: "Folder2", categories: ["Folder"], parent: 3, size: 0 },
  {
    id: 55,
    name: "Code.py",
    categories: ["Programming"],
    parent: -1,
    size: 1536,
  },
  {
    id: 89,
    name: "Audio.mp3",
    categories: ["Media", "Audio"],
    parent: 34,
    size: 2560,
  },
  {
    id: 144,
    name: "Spreadsheet2.xlsx",
    categories: ["Documents", "Excel"],
    parent: 3,
    size: 2048,
  },
  { id: 233, name: "Folder3", categories: ["Folder"], parent: -1, size: 4096 },
];

console.assert(
  arraysEqual(
    leafFiles(testFiles).sort((a, b) => a.localeCompare(b)),
    [
      "Audio.mp3",
      "Backup.zip",
      "Code.py",
      "Document.txt",
      "Image.jpg",
      "Presentation.pptx",
      "Spreadsheet.xlsx",
      "Spreadsheet2.xlsx",
      "Video.mp4",
    ]
  )
);

console.assert(
  arraysEqual(kLargestCategories(testFiles, 3), [
    "Documents",
    "Folder",
    "Media",
  ])
);

console.assert(largestFileSize(testFiles) == 20992);
