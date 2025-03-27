class File {
	constructor(id, name, size, type, content, tags = []) {
		this.id = id;
		this.name = name;
		this.size = size;
		this.type = type;
		this.content = content;
		this.tags = tags;
		this.createdAt = new Date();
		this.lastModified = new Date();
	}
}

class FileManagementSystem {
	constructor() {
		this.files = [];
		this.fileMap = new Map(); // For O(1) lookups by ID
		this.filesByType = new Map(); // For faster filtering by file type
		this.filesByTag = new Map(); // for faster filtering by tag
	}

	// O(1) - Constant time operation
	// Adding a file to the end of an array is O(1)
	// Map insertions are also O(1)
	addFile(file) {
		this.files.push(file);
		this.fileMap.set(file.id, file);

		// update type index
		if (!this.filesByType.has(file.type)) {
			this.filesByType.set(file.type, []);
		}

		this.filesByType.get(file.type).push(file);

		// update tag indices
		file.tags.forEach(tag => {
			if (!this.filesByTag.has(tag)) {
				this.filesByTag.set(tag, []);
			}
			this.filesByTag.get(tag).push(file);
		});

		return file;
	}

	// O(1) - Constant time operation
	// Map lookups are O(1)
	getFileById(id) {
		console.time("getFileById");
		const result = this.fileMap.get(id);
		console.timeEnd("getFileById");
		return result;
	}

	// O(n) - Linear time operation
	// We have to iterate through all files to find those matching the name
	findFilesByName(name) {
		console.time("findFilesByName");
		const result = this.files.filter(file => file.name.toLowerCase().includes(name.toLowerCase()));
		console.timeEnd("findFilesByName");
		return result;
	}

	// O(1) - Constant time for the map lookup, then O(k) where k is the number of files of that type
	// Much better than O(n) where n is the total number of files
	findFilesByType(type) {
		console.time("findFilesByType");
		const result = this.filesByType.get(type) || [];
		console.timeEnd("findFilesByType");
		return result;
	}

	// O(1) - Constant time for the map lookup, then O(k) where k is the number of files with that tag
	findFilesByTag(tag) {
		console.time("findFilesByTag");
		const result = this.filesByTag.get(tag) || [];
		console.timeEnd("findFilesByTag");
		return result;
	}

	// O(n) - Linear time operation 
	// We have to scan all files
	findLargestFiles(count = 5) {
		console.time("findLargestFiles");

		// Sort files by size (descending)
		// Sorting is O(n log n)
		const sortedFiles = [...this.files].sort((a, b) => b.size - a.size);

		// Get the top 'count' files - O(1)
		const result = sortedFiles.slice(0, count);

		console.timeEnd("findLargestFiles");
		return result;
	}

	// O(n) - Linear time operation
	// We need to iterate through all files to calculate the total size
	calculateTotalStorageUsed() {
		console.time("calculateTotalStorageUsed");
		const totalSize = this.files.reduce((sum, file) => sum + file.size, 0);
		console.timeEnd("calculateTotalStorageUsed");
		return totalSize;
	}

	// O(n log n) - Linearithmic time operation
	// Sorting is O(n log n)
	sortFilesByName(ascending = true) {
		console.time("sortFilesByName");

		const sortedFiles = [...this.files].sort((a, b) => {
			if (ascending) {
				return a.name.localeCompare(b.name)
			} else {
				return b.name.localeCompare(a.name);
			}
		})

		console.timeEnd("sortFilesByName");
		return sortedFiles;
	}

	// O(n log n) - Linearithmic time operation
	// Sorting is O(n log n)
	sortFilesByDate(ascending = true) {
		console.time("sortFilesByDate");

		const sortedFiles = [...this.files].sort((a, b) => {
			if (ascending) {
				return a.createdAt - b.createdAt;
			} else {
				return b.createdAt - a.createdAt;
			}
		})

		console.timeEnd("sortFilesByDate");
		return sortedFiles;
	}

	// O(n log n) - Linearithmic time operation using efficient sorting
	// Alternative implementation showing a different approach
	getFilesSortedBySize(ascending = false) {
		console.time("getFilesSortedBySize");

		// Using merge sort principle (JavaScript's built-in sort is typically O(n log n))
		const result = [...this.files].sort((a, b) => ascending ? a.size - b.size : b.size - a.size)

		console.timeEnd("getFilesSortedBySize");
		return result;
	}

	// O(n²) - Quadratic time operation
	// This is a naive implementation of duplicate content detection
	// Each file is compared with every other file
	findDuplicateContentFiles() {
		console.time("findDuplicateContentFiles");
		const duplicates = [];

		// This nested loop is O(n²)
		for (let i = 0; i < this.files.length; i++) {
			for (let j = i + 1; j < this.files.length; j++) {
				if (this.files[i].content === this.files[j].content) {
					duplicates.push({
						original: this.files[i],
						duplicate: this.files[j],
					})
				}
			}
		}

		console.timeEnd("findDuplicateContentFiles");
		return duplicates;
	}

	// O(n) with optimization - Linear time operation
	// This improved implementation uses hashing for faster content comparison
	findDuplicateContentFilesOptimized() {
		console.time("findDuplicateContentFilesOptimized");

		const contentMap = new Map();
		const duplicates = [];

		// O(n) operation
		for (const file of this.files) {
			// We could use a real hash function for the content
			// but for simplicity, we'll use the content itself as the key
			if (contentMap.has(file.content)) {
				duplicates.push({
					original: contentMap.get(file.content),
					duplicate: file
				})
			} else {
				contentMap.set(file.content, file);
			}
		}

		console.timeEnd("findDuplicateContentFilesOptimized");
		return duplicates;
	}

	// O(n log m) where n is number of files and m is average content length
	// This demonstrates text search across all files
	searchTextInAllFiles(searchTerm) {
		console.time("searchTextInAllFiles");

		const matchingFiles = [];

		// O(n) operation, where n is the number of files
		for (const file of this.files) {
			// String search is O(m) where m is the length of content
			// (though real string search can be optimized to O(m) or better with algorithms like KMP)
			if (file.content.includes(searchTerm)) {
				matchingFiles.push(file);
			}
		}

		console.timeEnd("searchTextInAllFiles");
		return matchingFiles;
	}

	// O(n) - Linear time operation
	// Generating file type statistics
	generateFileTypeStatistics() {
		console.time("generateFileTypeStatistics");

		const statistics = {};

		// O(n) operation
		for (const file of this.files) {
			if (!statistics[file.type]) {
				statistics[file.type] = {
					count: 0,
					totalSize: 0,
					averageSize: 0
				}
			}

			statistics[file.type].count++;
			statistics[file.type].totalSize += file.size;
		}

		// O(k) operation where k is the number of file types
		// Typically k << n, so this doesn't affect the overall O(n) complexity
		for (const type in statistics) {
			statistics[type].averageSize = statistics[type].totalSize / statistics[type].count;
		}

		console.timeEnd("generateFileTypeStatistics");
		return statistics;
	}

	// O(n log n) - Linearithmic time operation
	// This simulates a complex reporting function with multiple operations
	generateStorageReport() {
		console.time("generateStorageReport");

		const report = {
			totalFiles: this.files.length,
			totalStorageUsed: this.calculateTotalStorageUsed(),
			averageFileSize: 0,
			largestFiles: this.findLargestFiles(5),
			fileTypes: this.generateFileTypeStatistics(),
			recentlyAdded: this.sortFilesByDate(false).slice(0, 5)
		}

		if (report.totalFiles > 0) {
			report.averageFileSize = report.totalStorageUsed / report.totalFiles;
		}

		console.timeEnd("generateStorageReport");
		return report;
	}

	// O(n) - Linear time operation
	// Simulates a batch update operation
	batchUpdateTags(fileIds, tagsToAdd, tagsToRemove) {
		console.time("batchUpdateTags");

		// O(m) where m is the number of fileIds
		for (const id of fileIds) {
			const file = this.fileMap.get(id); // O(1)

			if (file) {
				// Update tags
				// First remove tags from tagsToRemove
				file.tags = file.tags.filter(tag => !tagsToRemove.include(tag));

				// then add new tags, avoiding duplicates
				for (const tag of tagsToAdd) {
					if (!file.tags.includes(tag)) {
						file.tags.push(tag)

						// update the tag index
						if (!this.filesByTag.has(tag)) {
							this.filesByTag.set(tag, []);
						}
						this.filesByTag.get(tag).push(file)
					}
				}

				// update last modified timestamp
				file.lastModified = new Date();
			}
		}
		console.timeEnd("batchUpdateTags");
	}

	// O(n) - Linear time operation with early termination
	// This demonstrates linear search with early termination
	doesAnyFileContain(searchTerm) {
		console.time("doesAnyFileContain");
		const found = this.files.some(file => file.content.includes(searchTerm));
		console.timeEnd("doesAnyFileContain");
		return found;
	}

	// O(log n) - Logarithmic time operation
	// This demonstrates binary search on sorted data
	findFileByNameBinarySearch(exactName) {
		console.time("findFileByNameBinarySearch");

		// First sort the files by name - O(n log n)
		const sortedFiles = this.sortFilesByName();

		// Now perform binary search - O(log n)
		let left = 0;
		let right = sortedFiles.length - 1;
		let result = null;

		while (left <= right) {
			const mid = Math.floor((left + right) / 2);
			const comparison = sortedFiles[mid].name.localeCompare(exactName);

			if (comparison === 0) {
				result = sortedFiles[mid];
				break;
			} else if (comparison < 0) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		console.timeEnd("findFileByNameBinarySearch");
		return result;
	}
}

// Extending the File Management System with Fuzzy Search capabilities
class FuzzySearchFileSystem extends FileManagementSystem {
	constructor() {
		super();
		// Additional indexing for optimized fuzzy search
		this.fileNameWords = new Map();  // Word -> files containing that word
	}

  // Override the addFile method to build our word index
	addFile(file) {
    // Call the parent class method first
		const result = super.addFile(file);

		// Now add to our word index for fuzzy search optimization
		const words = this.extractWords(file.name);
		words.forEach(word => {
			if (!this.fileNameWords.has(word)) {
				this.fileNameWords.set(word, new Set());
			}
			this.fileNameWords.get(word).add(file);
		});

		return result;
	}

	extractWords(text) {
		return text.toLowerCase()
			.replace(/[^\w\s]/g, '') // remove punctuation
			.split(/\s+/) 					// split by whitespace
			.filter(word => word.length > 1); // only keep words with 2+ chars
	}

	// Calculate Levenshtein distance between two strings
	// Time Complexity: O(m*n) where m and n are the lengths of the strings
	// Space Complexity: O(m*n)
	levenshteinDistance(str1, str2) {
		// console.time('levenshteinDistance');

		const m = str1.length;
		const n = str2.length;

		// Create a matrix of size (m+1) x (n+1)
		const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

		// initialize the matrix
		for (let i = 0; i <= m; i++) {
			dp[i][0] = i;
		}

		for (let j = 0; j <= n; j++) {
			dp[0][j] = j;
		}

		// fill the matrix
		for (let i = 1; i <= m; i++) {
			for (let j = 1; j <= n; j++) {
				if (str1[i - 1] === str2[j - 1]) {
					dp[i][j] = dp[i - 1][j - 1];
				} else {
					dp[i][j] = 1 + Math.min(
						dp[i - 1][j], // deletion
						dp[i][j - 1], // insertion
						dp[i - 1][j - 1] // substitution
					)
				}
			}
		}

		// console.timeEnd('levenshteinDistance');
		return dp[m][n];
	}

  // Calculate a normalized similarity score between two strings
  // Returns a value between 0 (no similarity) and 1 (identical)
	similarityScore(str1, str2) {
		const maxLength = Math.max(str1.length, str2.length);
		if(maxLength === 0) return 1.0; // Both strings are empty

		const distance = this.levenshteinDistance(str1, str2);
		return 1.0 - (distance / maxLength);
	}

	
  // Basic fuzzy search on file names
  // Time Complexity: O(n * m * k) where:
  // - n is the number of files
  // - m is the average length of file names
  // - k is the length of the search term
	fuzzySearchBasic(searchTerm, threshold = 0.6) {
    console.time('fuzzySearchBasic');
		const results = [];
		searchTerm = searchTerm.toLowerCase();

		for(const file of this.files) {
			const similarity = 
				this.similarityScore(file.name.toLowerCase(), searchTerm);
			if(similarity >= threshold) {
				results.push({file, similarity});
			}
		}

		results.sort((a,b) => b.similarity - a.similarity);
    console.timeEnd('fuzzySearchBasic');
		return results;
	}

  // Optimized fuzzy search using word-level indexing
  // Better performance for partial matches
  // Time Complexity: Averages much better than O(n * m * k) due to pre-indexing
	fuzzySearchOptimized(searchTerm, threshold = 0.6) {
    console.time('fuzzySearchOptimized');
    
		const searchWords = this.extractWords(searchTerm);
		const candidateFiles = new Set();
    
    // First, get potential candidates based on word matching
    // This narrows down our search space significantly
		if(searchWords.length > 0) {
      // Get files that contain any of the search words
			for (const word of searchWords) {
				// Look for exact word matches
				if(this.fileNameWords.has(word)) {
					const matchingFiles = this.fileNameWords.get(word);
					matchingFiles.forEach(file => candidateFiles.add(file));
				}

				// Look for similar words if no exact match
				if(!this.fileNameWords.has(word)) {
					for (const [indexedWord, files] of this.fileNameWords.entries()) {
						const wordSimilarity = this.similarityScore(word, indexedWord);
						if(wordSimilarity >= threshold) {
							files.forEach(file => candidateFiles.add(file))
						}
					}
				}
			}
		} else {
      // If no valid search words, fall back to checking all files
			this.files.forEach(file => candidateFiles.add(file))
		}
		
    // Now perform detailed similarity check on the candidates
		const results = [];
		const lowerSearchTerm = searchTerm.toLowerCase();

		for (const file of candidateFiles) {
			const similarity = this.similarityScore(
				file.name.toLowerCase(), 
				lowerSearchTerm
			);
 
			if(similarity >= threshold) {
				results.push({file, similarity});
			}
		}

		// Sort by similarity score (highest first))
		results.sort((a,b) => b.similarity - a.similarity);

    console.timeEnd('fuzzySearchOptimized');
		return results;
	}

  // Search file contents with fuzzy matching
  // Time Complexity: O(n * c * k) where c is the average content length
	fuzzySearchContent(searchTerm, threshold = 0.4) {
		console.time('fuzzySearchContent');

		const results = [];
		searchTerm = searchTerm.toLowerCase();

		for (const file of this.files) {
      // For content, we'll use a different approach
      // We'll look for the search term within chunks of the content
			const content = file.content.toLowerCase();

      // Simple case: exact content match
			if(content.includes(searchTerm)) {
				results.push({file, similarity: 1.0, matchType: 'exact'});
				continue;
			}

			// Split content into chunks of words
			const contentWords=  this.extractWords(content);

			// Use sliding window to look for fuzzy matches
			const searchWords = this.extractWords(searchTerm);

			if(searchWords.length === 0 || contentWords.length === 0) {
				continue;
			}

			let maxSimilarity = 0;

      // For very short search terms, compare with each word
			if(searchWords.length === 1) {
				for (const word of contentWords) {
					const similarity = this.similarityScore(word, searchWords[0]);
					maxSimilarity = Math.max(maxSimilarity, similarity);
				}
			} else {
      	// For longer search terms, use sliding window
				for(let i = 0; i <= contentWords.length - searchWords.length; i++) {
					const windowWords = contentWords.slice(i, i + searchWords.length);
					const windowText = windowWords.join(' ');
					const searchText = searchWords.join(' ');

					const similarity = this.similarityScore(windowText, searchText);
					maxSimilarity = Math.max(maxSimilarity, similarity);
				}
			}

			if(maxSimilarity >= threshold) {
				results.push({file, similarity: maxSimilarity, matchType: 'fuzzy'})
			}
		}
		
		// Sort by similarity score (highest first)
		results.sort((a, b) => b.similarity - a.similarity);

    console.timeEnd('fuzzySearchContent');
		return results;
	}

	fuzzySearchAll(searchTerm, options = {}) {
    console.time('fuzzySearchAll');
		const {
			nameThreshold = 0.6,
			contentThreshold = 0.4,
			includeNames = true,
			includeContent = true,
			includeTags = true,
			maxResults = 10
		} = options;

		const allResults = [];

		// Search file names
		if(includeNames) {
			const nameResults = this.fuzzySearchOptimized(searchTerm, nameThreshold);
			nameResults.forEach(result => {
				result.matchField = 'name';
				allResults.push(result)
			})
		}

		// Search file contents
		if(includeContent) {
			const contentResults = this.fuzzySearchContent(searchTerm, contentThreshold);
			contentResults.forEach(result => {
				result.matchField = 'content';
				allResults.push(result)
			})
		}

		// Search tags (using exact + partial matching for simplicity)
		if(includeTags) {
			const lowerSearchTerm = searchTerm.toLowerCase();
			for (const file of this.files) {
				// Skip files already included from other searches
				if(allResults.some(r => r.file.id === file.id)) {
					continue;
				}

        // Check for tag matches
				for (const tag of file.tags) {
					const similarity = this.similarityScore(tag.toLowerCase(), lowerSearchTerm);
					if(similarity >= nameThreshold) {
						allResults.push({
							file,
							similarity,
							matchField: 'tag',
							matchType: similarity === 1 ? 'exact' : 'fuzzy'
						});
						break; // only add file once
					}
				}
			}
		}
    
		// Remove duplicates (keeping highest similarity)
		const uniqueResults = [];
		const addedFileIds = new Set();

		for (const result of allResults) {
			if(!addedFileIds.has(result.file.id)) {
				uniqueResults.push(result);
				addedFileIds.add(result.file.id);
			} else {
        // If this is a better match for an already added file, replace it
				const existingIndex = uniqueResults.findIndex(r => r.file.id === result.file.id);
				if(existingIndex !== -1 && result.similarity > uniqueResults[existingIndex].similarity) {
					uniqueResults[existingIndex] = result;
				}
			}
		}

		// Sort by similarity and limit results
		uniqueResults.sort((a,b) => b.similarity - a.similarity);
		const finalResults = uniqueResults.slice(0, maxResults);

    console.timeEnd('fuzzySearchAll');
		return finalResults;
	}
  
  // Format search results for display
	formatSearchResults(results) {
		return results.map(result => {
			const {file, similarity, matchField, matchType} = result;
			return {
				id: file.id,
				name: file.name,
				type: file.type,
				similarity: similarity.toFixed(2),
				matchDetails: `${matchField || 'unknown'} (${matchType || 'fuzzy'})`,
				relevance: this.getRelevanceDescription(similarity)
			}
		})
	}

  // Helper to convert similarity score to human-readable description
	getRelevanceDescription(similarity) {
		if(similarity > 0.9) return 'Excellent match';
		if(similarity > 0.8) return 'Good match';
		if(similarity > 0.7) return 'Fair match';
		if(similarity > 0.6) return 'Possible match';
		return 'Weak match'
	}
}

const fileSystem = new FileManagementSystem();

// Helper function to create sample files
function createSampleFile(id, name, type, size, content, tags = []) {
	return new File(id, name, size, type, content, tags);
}

// // Add some sample files - O(1) for each addition
// console.log("\n--- Adding Sample Files ---");
// fileSystem.addFile(createSampleFile(1, "Report Q1.docx", "document", 250, "Q1 financial report content...", ["report", "financial", "Q1"]));
// fileSystem.addFile(createSampleFile(2, "logo.png", "image", 450, "Binary image content...", ["logo", "branding"]));
// fileSystem.addFile(createSampleFile(3, "customer_data.csv", "spreadsheet", 720, "Customer,Email,Purchase", ["customer", "data"]));
// fileSystem.addFile(createSampleFile(4, "presentation.pptx", "presentation", 1200, "Company presentation content...", ["presentation", "company"]));
// fileSystem.addFile(createSampleFile(5, "Report Q2.docx", "document", 275, "Q2 financial report content...", ["report", "financial", "Q2"]));
// fileSystem.addFile(createSampleFile(6, "app.js", "code", 15, "console.log('Hello World');", ["code", "javascript"]));
// fileSystem.addFile(createSampleFile(7, "data_backup.csv", "spreadsheet", 890, "Customer,Email,Purchase", ["backup", "data"]));
// fileSystem.addFile(createSampleFile(8, "Report Q3.docx", "document", 310, "Q3 financial report content...", ["report", "financial", "Q3"]));
// fileSystem.addFile(createSampleFile(9, "style.css", "code", 22, "body { font-family: Arial; }", ["code", "css"]));
// fileSystem.addFile(createSampleFile(10, "Report Q4.docx", "document", 290, "Q4 financial report content...", ["report", "financial", "Q4"]));

// // Add duplicate content file
// fileSystem.addFile(createSampleFile(11, "customer_data_copy.csv", "spreadsheet", 720, "Customer,Email,Purchase", ["customer"]));

// // Let's add 100 more files to see the performance difference
// for (let i = 0; i < 122; i++) {
// 	const types = ['document', 'image', 'spreadsheet', 'presentation', 'code'];
// 	const randomType = types[Math.floor(Math.random() * types.length)];
// 	const randomSize = Math.floor(Math.random() * 1500) + 10;
// 	const randomContent = `Content for file ${i}...`;

// 	fileSystem.addFile(createSampleFile(
// 		i,
// 		`File${i}.${randomType === 'code' ? 'js' : randomType}`,
// 		randomType,
// 		randomSize,
// 		randomContent,
// 		[randomType]
// 	));
// }

// // Example operations
// console.log("\n--- O(1) Operations ---");
// console.log("Get file by ID 1:", fileSystem.getFileById(1).name);
// console.log("Get file by ID 5:", fileSystem.getFileById(5).name);

// console.log('');

// console.log("\n--- O(n) Operations (Linear) ---");
// console.log("Files containing 'Report':", fileSystem.findFilesByName("Report").map(f => f.name));
// console.log("Document files:", fileSystem.findFilesByType("document").length);
// console.log("Files with tag 'financial':", fileSystem.findFilesByTag("financial").map(f => f.name));
// console.log("Total storage used:", fileSystem.calculateTotalStorageUsed(), "KB");

// console.log('');

// console.log("\n--- O(n log n) Operations (Linearithmic) ---");
// console.log("Files sorted by name (first 5):", fileSystem.sortFilesByName().slice(0, 5).map(f => f.name));
// console.log("Files sorted by date (first 5):", fileSystem.sortFilesByDate(false).slice(0, 5).map(f => f.name));
// console.log("Largest files:", fileSystem.findLargestFiles(3).map(f => `${f.name} (${f.size} KB)`));

// console.log('');

// console.log("\n--- O(n²) vs O(n) - Quadratic vs Linear Comparison ---");
// // First run the O(n²) solution for finding duplicates
// console.log("Finding duplicates (O(n²) approach):");
// const duplicatesQuadratic = fileSystem.findDuplicateContentFiles();
// console.log(`Found ${duplicatesQuadratic.length} duplicates`);

// console.log('');

// // Then run the optimized O(n) solution
// console.log("Finding duplicates (O(n) optimized approach):");
// const duplicatesLinear = fileSystem.findDuplicateContentFilesOptimized();
// console.log(`Found ${duplicatesLinear.length} duplicates`);

// console.log('');

// console.log("\n--- Complex Operations ---");
// console.log("Generating file statistics:");
// const statistics = fileSystem.generateFileTypeStatistics();
// console.log(`Document files: ${statistics.document?.count || 0}`);
// console.log(`Image files: ${statistics.image?.count || 0}`);
// console.log(`Code files: ${statistics.code?.count || 0}`);

// console.log('');

// console.log("\n--- O(log n) Operations (Logarithmic) ---");
// console.log("Binary search for 'Report Q3.docx':",
// 	fileSystem.findFileByNameBinarySearch("Report Q3.docx")?.name || "Not found");

// console.log('');

// console.log("\n--- System Report ---");
// console.log("Generating full system report...");
// const report = fileSystem.generateStorageReport();
// console.log(`Total files: ${report.totalFiles}`);
// console.log(`Total storage: ${report.totalStorageUsed} KB`);
// console.log(`Average file size: ${report.averageFileSize.toFixed(2)} KB`);
// console.log(`File types: ${Object.keys(report.fileTypes).length} different types`);

// console.log('');

// // Performance comparison between linear search vs indexed lookup
// console.log("\n--- Performance Comparison: Linear Search vs Indexed Lookup ---");

// console.time("Linear search by type");
// for (let i = 0; i < 1000; i++) {
// 	// Traditional way - iterate through all files - O(n)
// 	const docs = fileSystem.files.filter(file => file.type === "document");
// }
// console.timeEnd("Linear search by type");

// console.log('');

// // console.time("Indexed lookup by type");
// // for (let i = 0; i < 1000; i++) {
// //   // Using our indexed approach - O(1) lookup
// //   const docs = fileSystem.findFilesByType("document");
// // }
// // console.timeEnd("Indexed lookup by type");

// console.log('');

// console.log("\n--- Final Thoughts ---");
// console.log("The examples above demonstrate various Big O complexities:");
// console.log("- O(1): Constant time operations like direct lookups");
// console.log("- O(log n): Logarithmic operations like binary search");
// console.log("- O(n): Linear operations that scan through all items once");
// console.log("- O(n log n): Linearithmic operations like sorting");
// console.log("- O(n²): Quadratic operations with nested loops");
// console.log("\nOptimizing algorithms and data structures can significantly improve performance,");
// console.log("especially as the dataset grows larger.");


// Create our extended file management system
const fuzzyFileSystem = new FuzzySearchFileSystem()

// -- fuzzy algorithm implementation
// Add some sample files with intentional typos and variations for testing fuzzy search
console.log("\n--- Adding Sample Files for Fuzzy Search Testing ---");
fuzzyFileSystem.addFile(createSampleFile(1, "Q1 Financial Report.docx", "document", 250, "First quarter financial results for 2023.", ["report", "financial", "Q1"]));
fuzzyFileSystem.addFile(createSampleFile(2, "Company Logo.png", "image", 450, "Binary image content...", ["logo", "branding"]));
fuzzyFileSystem.addFile(createSampleFile(3, "Customer Data 2023.csv", "spreadsheet", 720, "Customer,Email,Purchase,Date", ["customer", "data", "2023"]));
fuzzyFileSystem.addFile(createSampleFile(4, "Annual Presentation.pptx", "presentation", 1200, "Annual company presentation for stakeholders", ["presentation", "company", "annual"]));
fuzzyFileSystem.addFile(createSampleFile(5, "Q2 Financial Rport.docx", "document", 275, "Second quarter financial results for 2023.", ["report", "financial", "Q2"]));
fuzzyFileSystem.addFile(createSampleFile(6, "User Authentication.js", "code", 15, "function authenticate(user, password) { /* code */ }", ["authentication", "javascript"]));
fuzzyFileSystem.addFile(createSampleFile(7, "Customer Data - Backup.csv", "spreadsheet", 890, "Customer,Email,Purchase,Date,Location", ["backup", "customer", "data"]));
fuzzyFileSystem.addFile(createSampleFile(8, "Q3-Finance-Report.docx", "document", 310, "Third quarter financial results for 2023.", ["report", "financial", "Q3"]));
fuzzyFileSystem.addFile(createSampleFile(9, "main.css", "code", 22, "body { font-family: Arial; color: #333; }", ["code", "css", "styles"]));
fuzzyFileSystem.addFile(createSampleFile(10, "4th Quarter Financial Summary.docx", "document", 290, "Fourth quarter financial results for 2023.", ["report", "financial", "Q4"]));
fuzzyFileSystem.addFile(createSampleFile(11, "UserData_2023.csv", "spreadsheet", 720, "User,Email,LastLogin", ["users", "data", "2023"]));
fuzzyFileSystem.addFile(createSampleFile(12, "ExpenseReport_March.xlsx", "spreadsheet", 340, "Department,Category,Amount,Date", ["expenses", "report", "march"]));
fuzzyFileSystem.addFile(createSampleFile(13, "Marketing Strategy 2023.pptx", "presentation", 890, "Marketing strategy presentation for 2023", ["marketing", "strategy", "presentation"]));
fuzzyFileSystem.addFile(createSampleFile(14, "Product Roadmap.docx", "document", 450, "Product development roadmap for next 12 months", ["product", "roadmap", "development"]));
fuzzyFileSystem.addFile(createSampleFile(15, "HR Policy Manual.pdf", "document", 1200, "Company HR policies and procedures", ["HR", "policy", "manual"]));

// Demonstrate basic fuzzy search
// console.log("\n--- Basic Fuzzy Search for 'financial report' ---");
// console.log("This search will find items with similar names even with typos");
// const basicResults = fuzzyFileSystem.fuzzySearchBasic("financial report");
// console.log(fuzzyFileSystem.formatSearchResults(basicResults.slice(0, 5)));
// [{id: 1,name: 'Q1 Financial Report.docx',type: 'document', ... }, {id: 5,name: 'Q2 Financial Rport.docx',...} ]

// Demonstrate optimized fuzzy search
// console.log("\n--- Optimized Fuzzy Search for 'financial report' ---");
// console.log("This uses word indexing for better performance");
// const optimizedResults = fuzzyFileSystem.fuzzySearchOptimized("financial report");
// console.log(fuzzyFileSystem.formatSearchResults(optimizedResults.slice(0, 5)));
// [{id: 1,name: 'Q1 Financial Report.docx',type: 'document', ... }, {id: 5,name: 'Q2 Financial Rport.docx',...} ]


// Demonstrate content fuzzy search
// console.log("\n--- Content Fuzzy Search for 'quarterly financial' ---");
// console.log("This searches within file contents");
// const contentResults = fuzzyFileSystem.fuzzySearchContent("quarterly financial");
// console.log(fuzzyFileSystem.formatSearchResults(contentResults.slice(0, 5)));
/*
[
  {
    id: 1,
    name: 'Q1 Financial Report.docx',
    type: 'document',
    similarity: '0.89',
    matchDetails: 'unknown (fuzzy)',
    relevance: 'Good match'
  },
  {
    id: 5,
    name: 'Q2 Financial Rport.docx',
    type: 'document',
    similarity: '0.89',
    matchDetails: 'unknown (fuzzy)',
    relevance: 'Good match'
  },
  {
    id: 8,
    name: 'Q3-Finance-Report.docx',
    type: 'document',
    similarity: '0.89',
    matchDetails: 'unknown (fuzzy)',
    relevance: 'Good match'
  },
  {
    id: 10,
    name: '4th Quarter Financial Summary.docx',
    type: 'document',
    similarity: '0.89',
    matchDetails: 'unknown (fuzzy)',
    relevance: 'Good match'
  }
]
*/ 
// Demonstrate combined search
// console.log("\n--- Combined Fuzzy Search for 'finance' ---");
// console.log("This searches across names, contents, and tags");
// const combinedResults = 
// 	fuzzyFileSystem.fuzzySearchAll("finance", {nameThreshold: 0.5,contentThreshold: 0.3,includeNames: true,includeContent: true,includeTags: true,maxResults: 10});
// console.log(fuzzyFileSystem.formatSearchResults(combinedResults));
/*
[
  {
    id: 1,
    name: 'Q1 Financial Report.docx',
    type: 'document',
    similarity: '0.67',
    matchDetails: 'content (fuzzy)',
    relevance: 'Possible match'
  },
  {
    id: 5,
    name: 'Q2 Financial Rport.docx',
    type: 'document',
    similarity: '0.67',
    matchDetails: 'content (fuzzy)',
    relevance: 'Possible match'
  },
  {
    id: 8,
    name: 'Q3-Finance-Report.docx',
    type: 'document',
    similarity: '0.67',
    matchDetails: 'content (fuzzy)',
    relevance: 'Possible match'
  },
  {
    id: 10,
    name: '4th Quarter Financial Summary.docx',
    type: 'document',
    similarity: '0.67',
    matchDetails: 'content (fuzzy)',
    relevance: 'Possible match'
  },
  {
    id: 2,
    name: 'Company Logo.png',
    type: 'image',
    similarity: '0.43',
    matchDetails: 'content (fuzzy)',
    relevance: 'Weak match'
  },
  {
    id: 9,
    name: 'main.css',
    type: 'code',
    similarity: '0.30',
    matchDetails: 'content (fuzzy)',
    relevance: 'Weak match'
  }
]
*/ 

// Performance comparison with misspelled search term
console.log("\n--- Performance Comparison: Regular vs Fuzzy Search ---");
console.log("Searching for 'finacial reprt' (misspelled)");

console.time("Regular exact search (will miss misspellings)");
const regularResults = fuzzyFileSystem.findFilesByName("finacial reprt");
console.timeEnd("Regular exact search (will miss misspellings)");
console.log(`Regular search results: ${regularResults.length} files found`); // Regular search results: 0 files found

console.time("Fuzzy name search");
const fuzzyResults = fuzzyFileSystem.fuzzySearchOptimized("finacial reprt", 0.6);
console.timeEnd("Fuzzy name search");
console.log(`Fuzzy search results: ${fuzzyResults.length} files found`); // Fuzzy search results: 0 files found
console.log(fuzzyFileSystem.formatSearchResults(fuzzyResults));

// Demonstrate tolerance to typos with different thresholds
console.log("\n--- Fuzzy Search with Different Similarity Thresholds ---");

console.log("\nStrictThreshold (0.8) - Searching for 'finansial':");
const strictResults = fuzzyFileSystem.fuzzySearchOptimized("finansial", 0.8);
console.log(`Found ${strictResults.length} results`); // Found 0 result
console.log(fuzzyFileSystem.formatSearchResults(strictResults));

console.log("\nModerate Threshold (0.6) - Searching for 'finansial':");
const moderateResults = fuzzyFileSystem.fuzzySearchOptimized("finansial", 0.6);
console.log(`Found ${moderateResults.length} results`); // Found 0 results
console.log(fuzzyFileSystem.formatSearchResults(moderateResults));

console.log("\nLenient Threshold (0.4) - Searching for 'finansial':");
const lenientResults = fuzzyFileSystem.fuzzySearchOptimized("finansial", 0.4);
console.log(`Found ${lenientResults.length} results`);
console.log(fuzzyFileSystem.formatSearchResults(lenientResults));

// Demonstrate time complexity impact with larger dataset
console.log("\n--- Time Complexity Analysis with Larger Dataset ---");

// Add 100 more random files
console.log("Adding 100 random files to test search scalability...");
for (let i = 100; i < 200; i++) {
  const types = ["document", "image", "spreadsheet", "presentation", "code"];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomSize = Math.floor(Math.random() * 1500) + 10;
  
  const titles = [
    "Project", "Report", "Analysis", "Presentation", "Document", 
    "Summary", "Data", "Research", "Plan", "Proposal"
  ];
  
  const adjectives = [
    "Annual", "Quarterly", "Monthly", "Weekly", "Daily",
    "Strategic", "Operational", "Financial", "Technical", "Marketing"
  ];
  
  const randomTitle = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${titles[Math.floor(Math.random() * titles.length)]} ${i}`;
  const randomContent = `Content for ${randomTitle}...`;
  
  fuzzyFileSystem.addFile(createSampleFile(
    i, 
    randomTitle, 
    randomType, 
    randomSize, 
    randomContent, 
    [randomType.toLowerCase()]
  ));
}

// Compare search algorithms with larger dataset
console.log("\nComparing search performance with larger dataset:");

console.time("Regular exact search (large dataset)");
const regularLargeResults = fuzzyFileSystem.findFilesByName("financial");
console.timeEnd("Regular exact search (large dataset)");
console.log(`Regular search results: ${regularLargeResults.length} files found\n`);

console.time("Basic fuzzy search (large dataset)");
const basicLargeResults = fuzzyFileSystem.fuzzySearchBasic("financial");
console.timeEnd("Basic fuzzy search (large dataset)");
console.log(`Basic fuzzy search results: ${basicLargeResults.length} files found`);

console.time("Optimized fuzzy search (large dataset)");
const optimizedLargeResults = fuzzyFileSystem.fuzzySearchOptimized("financial");
console.timeEnd("Optimized fuzzy search (large dataset)");
console.log(`Optimized fuzzy search results: ${optimizedLargeResults.length} files found`);

console.log("\n--- Fuzzy Search Big O Complexity Analysis ---");
console.log("1. Basic Fuzzy Search: O(n * m * k)");
console.log("   where n = number of files, m = average filename length, k = search term length");
console.log("   This becomes slower as collection grows");
console.log();
console.log("2. Optimized Fuzzy Search: O(c * m * k) where c << n");
console.log("   c = candidate files (subset of total files)");
console.log("   Pre-indexing significantly reduces the search space");
console.log();
console.log("3. Levenshtein Distance Calculation: O(m * k)");
console.log("   Core algorithm that determines string similarity");
console.log("   Dominates the computational cost for each comparison");
console.log();
console.log("As you can see from the timing results, the optimized approach");
console.log("scales much better with large datasets due to the reduced search space.");

console.log("\n--- Summary of Fuzzy Search Benefits ---");
console.log("1. Tolerance to typos and spelling errors");
console.log("2. Ability to find relevant results despite inconsistent naming");
console.log("3. More natural search experience for users");
console.log("4. Can be tuned by adjusting similarity thresholds");
console.log("5. Applicable to content search, not just metadata");
console.log("6. Performance can be optimized with proper indexing"); 