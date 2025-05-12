import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";



const yupSchema = yup.object().shape ({
    title: yup
     .string()
     .required("Nazwa użytkownika jest wymagana")
     .min(3, "Minimum 3 znaki"),
     

    price: yup
     .number()
     .required("Pole price jest wymagane")
     .positive("Tylko wartości dodatnie"),

    description: yup
     .string(),
    

    category: yup
     .string()
     .required("Kategoria jest wymagana"),
     
    image: yup
    .string() 
    .required("Opis jest wymagany")
    .url("Podaj prawidłowy URL")
});

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }, watch
    } = useForm({
            resolver: yupResolver(yupSchema),
        });

   const onSubmit = async (data) => {
    console.log("Dane formularza: ", data);
    try {
        const response = await axios.post(
            "https://fakestoreapi.com/users", {
                username: data.username,
                email: data.email,
                password: data.password,
            });
        console.log(response, "--");
    } catch (e) {
        console.log(e, "---")
    }
    
   };

   const currentPassword = watch("password")
   
   return (
    <form onSubmit={handleSubmit(onSubmit)} className="speca-y-4 mt-10">
      <h1>Dodaj produkt</h1>

      <div className="flex flex-col">
        <label>Nazwa</label>
        <input autoFocus {...register("title")} />
      </div>

      <div className="flex flex-col">
        <label>Cena</label>
        <input autoFocus {...register("price")} />
      </div>

      <div>
        <label>Opis</label>
      </div>

      <div>
        <label>Kategoria</label>
      </div>

      <div>
        <label>Zdjęcie</label>
      </div>
    </form>
  );
}