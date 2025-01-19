import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../../public/assets/p1.png';
import dessertImg from '../../../../public/assets/a1.png';
import PizzaImg from '../../../../public/assets/r1.png';
import SoupImg from '../../../../public/assets/f1.png';
import saladImg from '../../../../public/assets/e1.png';
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert'); 
    const soup = menu.filter(item => item.category === 'soup'); 
    const salad = menu.filter(item => item.category === 'salad'); 
    const pizza = menu.filter(item => item.category === 'pizza'); 
    const offered = menu.filter(item => item.category === 'offered'); 
    return (
        <div>
            <Helmet>
                <title>Product Hunt | Menu</title>
            </Helmet>
            <Cover menuImage={menuImg} title="Our Products"></Cover>
            {/* main Cover */}
            <SectionTitle
            subHeading="Don't Miss" heading="Today's Offer"
            ></SectionTitle>
            {/* offered Menu Items*/}
            <MenuCategory
            items={offered}></MenuCategory>
            {/* dessert Menu Items */}
            <MenuCategory
            items={dessert}
            title="Automobiles"
            img={dessertImg}
            ></MenuCategory>
            {/* Pizza */}
            <MenuCategory
            items={pizza}
            title="Restrurent"
            img={PizzaImg}
            ></MenuCategory>
            {/* Salad */}
            <MenuCategory
            items={salad}
            title="Electronic"
            img={saladImg}
            ></MenuCategory>
            {/* soup */}
            <MenuCategory
            items={soup}
            title="Fashion"
            img={SoupImg}
            ></MenuCategory>
            
        </div>
    );
};

export default Menu;
