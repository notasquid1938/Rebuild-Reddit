import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from '@/styles/Stats.module.css';
import LoadingSpinner from "./LoadingSpinner";

const Stats = ({ dateRange, subreddit }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [stats, setStats] = useState(null);  // Initialize as null to check if stats are available

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/Stats?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}&subreddit=${subreddit}`);
                console.log('Response Data:', response.data); // Log the response data
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [dateRange, subreddit]);

    return (
        <div className={styles.statsContainer}>
            <p className={styles.Title}>Stats</p>

            {isLoading && <LoadingSpinner />}

            {!isLoading && stats && (
                <div className={styles.statsContent}>
                    <p><strong>Total Posts:</strong> {stats.totalPosts}</p>
                    <p><strong>Unique Users:</strong> {stats.uniqueUsers}</p>
                    
                    <div>
                        <p><strong>Top 10 Subreddits by Posts:</strong></p>
                        <ul>
                            {stats.topSubreddits.map((subreddit, index) => (
                                <li key={index}>{subreddit.subreddit}: {subreddit.posts} posts</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p><strong>Top 10 Users by Posts:</strong></p>
                        <ul>
                            {stats.topUsers.map((user, index) => (
                                <li key={index}>{user.user}: {user.posts} posts</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {!isLoading && !stats && (
                <p>No stats available for the selected date range and subreddit.</p>
            )}
        </div>
    );
}

export default Stats;
