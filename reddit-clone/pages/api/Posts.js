// Import the necessary modules
import connectToDatabase from '../../db';

// Define the API route handler
export default async function handler(req, res) {
  try {
    // Extract query parameters from the request
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const subreddit = req.query.subreddit;
    const page = req.query.page || 1; // Added page parameter

    // Check if required parameters are present
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required query parameters' });
    }

    // Connect to the database
    const db = await connectToDatabase();

    // Extract year and month information from start and end dates
    const startYear = startDate.split('-')[0];
    const endYear = endDate.split('-')[0];
    const startMonth = startDate.split('-')[1];
    const endMonth = endDate.split('-')[1];

    // Generate collection names based on the date range
    const collectionNames = [];
    for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
      const startM = year === parseInt(startYear) ? parseInt(startMonth) : 1;
      const endM = year === parseInt(endYear) ? parseInt(endMonth) : 12;

      for (let month = startM; month <= endM; month++) {
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        collectionNames.push(`RS_${year}-${formattedMonth}`);
      }
    }

    // Define an array to store all posts
    const allPosts = [];

    // Loop through each collection and fetch all posts
    for (const collectionName of collectionNames) {
      const collection = db.collection(collectionName);
      let findQuery = {};

      // Add subreddit condition if provided and not 'all'
      if (subreddit && subreddit.toLowerCase() !== 'all') {
        findQuery = { subreddit: subreddit.toLowerCase() };
      }

      // Fetch all posts from the current collection
      const data = await collection.find(findQuery).toArray();
      allPosts.push(...data);
    }

    // Sort all posts by 'score' in descending order
    const sortedPosts = allPosts.sort((a, b) => b.score - a.score);

    // Calculate skip and limit for pagination
    const limit = 10; // You can adjust this as per your requirement
    const skip = (page - 1) * limit;

    // Get the posts for the current page
    const paginatedPosts = sortedPosts.slice(skip, skip + limit);

    // Return the paginated posts as a JSON response
    res.status(200).json(paginatedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
