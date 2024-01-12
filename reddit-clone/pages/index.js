import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Submissions from '../components/Submissions';
import Search from '@/components/Search';

function HomePage() {
  const [dateRange, setDateRange] = useState({ startDate: '0', endDate: '0' });

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <div>
      <Helmet>
        <title>Reddit - Dive into anything</title>
      </Helmet>
      <Search onDateRangeChange={handleDateRangeChange} />
      <Submissions dateRange={dateRange} />
    </div>
  );
}

export default HomePage;
