import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../Hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');
    return (
        <section className='mb-12'>
            <SectionTitle
            heading="From Our Menu"
            subHeading="Popular Item"
            >

            </SectionTitle>
            <div className='grid md:grid-cols-2 gap-5'>
                {
                    popular.map(item => <MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>
                    )
                }
            </div>
        </section>
    );
};

export default PopularMenu;