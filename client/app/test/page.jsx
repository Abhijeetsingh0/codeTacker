'use client'

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { getTokenFromCookie } from '../components/getUserData';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/codeTracker/', {
                  headers: {
                    'authorization': `Bearer ${getTokenFromCookie}`, // Correct spelling of "Bearer"
                  },
                });
                console.log(response)
                const data = response.data;
              
                // Process data to get tag frequencies
                const tagCounts = processData(data);
                
                // Map tags to colors
                const tags = Object.keys(tagCounts);
                const tagColors = mapTagsToColors(tags);
                
                // Prepare chart data
                const chartData = {
                    labels: tags,
                    datasets: [
                        {
                            label: 'Tags',
                            data: Object.values(tagCounts),
                            backgroundColor: tags.map(tag => tagColors[tag]),
                            borderColor: tags.map(tag => tagColors[tag]),
                            borderWidth: 1,
                        },
                    ],
                };
                
                setChartData(chartData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);
    
    return (
        <div>
            {chartData.labels ? <Doughnut data={chartData} /> : <p>Loading...</p>}
        </div>
    );
};

const processData = (data) => {
    const tagCounts = {};
    data.body.forEach(entry => {
        entry.tags.forEach(tag => {
            if (tagCounts[tag]) {
                tagCounts[tag]++;
            } else {
                tagCounts[tag] = 1;
            }
        });
    });
    return tagCounts;
};

const generateColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const mapTagsToColors = (tags) => {
    const tagColors = {};
    tags.forEach(tag => {
        tagColors[tag] = generateColor();
    });
    return tagColors;
};

export default DoughnutChart;
