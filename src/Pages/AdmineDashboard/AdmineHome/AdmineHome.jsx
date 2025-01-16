import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiousSecure from '../../../Hooks/useAxiousSecure';
import { FaBangladeshiTakaSign, FaUser, FaList, FaUtensils } from 'react-icons/fa6';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie } from 'recharts';
import { Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const AdmineHome = () => {
    const { user } = useAuth();
    const axiousSecure = useAxiousSecure();

    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiousSecure.get('/admin-stats');
            return res.data;
        },
    });

    const previousData = {
        revenue: 5000,
        users: 1000,
        orders: 500,
        menuItems: 300,
    };

    const calculatePercentage = (current, previous) => {
        if (previous === 0) return 100;
        return ((current - previous) / previous * 100).toFixed(2);
    };

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiousSecure.get('/order-stats');
            return res.data;
        }
    })

    // Custome Shape For The Part
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };
    //   custome paichart 
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
        const pieChartData = chartData.map(data => {
            return {name: data.category, value: data.revenue}
        })


    return (
        <div className='mx-4'>
            <h1 className='text-3xl text-center mt-4'>Dashboard</h1>
            <h2 className='text-3xl mt-4 mx-4'>
                <span className='text-green-600'>Hi, Welcome </span>
                {user?.displayName ? user.displayName : 'Back'}
            </h2>
            <div className="stats shadow mt-4 mx-4 w-full mx-auto">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaBangladeshiTakaSign></FaBangladeshiTakaSign>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">
                        {stats?.revenue ? stats.revenue.toLocaleString() : 'Loading...'}
                    </div>
                    <div className="stat-desc">
                        {stats ? `${calculatePercentage(stats.revenue, previousData.revenue)}%` : 'Calculating...'}
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaUser></FaUser>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">
                        {stats?.users ? stats.users.toLocaleString() : 'Loading...'}
                    </div>
                    <div className="stat-desc">
                        {stats ? `↗︎ ${calculatePercentage(stats.users, previousData.users)}%` : 'Calculating...'}
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaUtensils></FaUtensils>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">
                        {stats?.orders ? stats.orders.toLocaleString() : 'Loading...'}
                    </div>
                    <div className="stat-desc">
                        {stats ? `↘︎ ${calculatePercentage(stats.orders, previousData.orders)}%` : 'Calculating...'}
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaList></FaList>
                    </div>
                    <div className="stat-title">Total Items</div>
                    <div className="stat-value">
                        {stats?.menuItems ? stats.menuItems.toLocaleString() : 'Loading...'}
                    </div>
                    <div className="stat-desc">
                        {stats ? `↘︎ ${calculatePercentage(stats.menuItems, previousData.menuItems)}%` : 'Calculating...'}
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdmineHome;
