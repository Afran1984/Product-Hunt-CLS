import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiousPublic from "../../../Hooks/useAxiousPublic";
import useAxiousSecure from "../../../Hooks/useAxiousSecure";
import Swal from "sweetalert2";



const image_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiousPublic = useAxiousPublic();
    const axiousSecure = useAxiousSecure();

  const onSubmit = async (data) => { 
    console.log(data);
    // image uplaod to imgbb & then get url
    const imageFile = { image: data.image[0] }
    console.log(imageFile);
    const res = await axiousPublic.post(image_hosting_api, imageFile, {
        headers:{
            'content-type' : 'multipart/form-data'
        }
    });
    if(res.data.success){
        // naw send the menu Item to server system
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url
        }
        // send data to server
        const menuRes = await axiousSecure.post('/menu', menuItem);
        console.log(menuRes.data);
        if(menuRes.data.insertedId){
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is added to the menu`,
                showConfirmButton: false,
                timer: 1500
              });
        }

    }
    console.log(res.data);
  };

    return (
        <div>
            <SectionTitle heading="add Item" subHeading="New Items Add"></SectionTitle>
            <div className="mx-7">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <input {...register("name")} /> */}
                    <label className="form-control mt-4 w-full">
                        <div className="label">
                            <span className="label-text">Recipy Name</span>
                        </div>
                        <input type="text" placeholder="Enter Recipe name"
                        {...register('name', {required: true})}
                         className="input input-bordered w-full" />
                        </label>
                    <div className="flex mt-4 gap-4">
                        {/* categori */}
                        <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Category*</span>
                        </div>
                        <select defaultValue="default" {...register('category', {required: true})} className="select select-bordered w-full">
                        <option disabled value="default">Select a category!</option>
                        <option>SALAD</option>
                        <option>PIZZA</option>
                        <option>SOUPS</option>
                        <option>DESSERTS</option>
                        <option>DRINKS</option>
                    </select>
                        </label>
                        {/* Prices */}
                        <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Price*</span>
                        </div>
                        <input type="text" placeholder="Recipy Prices"
                        {...register('price', {required: true})}
                         className="input input-bordered w-full" />
                    </label>
                    </div>
                    {/* BIO Revwies */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipy Ditels</span>
                        </div>
                        <textarea {...register('recipe', {required: true})} className="textarea textarea-bordered h-24" placeholder="Add some Recipy Ditels"></textarea>
                    </label>
                    {/* file Input */}
                    <div className="form-control w-full mt-4">
                    <input {...register('image', {required: true})} type="file" className="file-input w-full max-w-xs" />
                    </div>
                    {/* button */}
                    {/* <input className="btn mt-4 w-full max-w-xs" type="submit" /> */}
                    <button className="btn mt-4 w-full max-w-xs">
                    <FaUtensils></FaUtensils>
                        Add Items
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;