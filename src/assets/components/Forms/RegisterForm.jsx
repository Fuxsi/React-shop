import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";


const yupSchema = yup.object().shape ({
    username: yup
     .string()
     .required("Nazwa użytkownika jest wymagana")
     .min(3, "Minimum 3 znaki")
     .max(20, "Maksimum 20 znaków"),

    email: yup
     .string()
     .required("Email jest wymagany")
     .email("Nieprawidłowy format email."),

    password: yup
     .string()
     .required("Wymagane hasło")
     .min(12, "Minimum 12 znaków")
     .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Hasło musi zawierać: 1 dużą literę, 1 małą literę i 1 cyfrę"
     ),

    confirmPassword: yup
     .string()
     .required("Wymagane potwierdzenie hasła")
     .oneOf([yup.ref("password")], "Hasła muszą być identyczne"), 
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
        <h1>Formularz rejestracji</h1>
        <div className="flex flex-col">
            <label>Username: </label>
            <input
             autoFocus
             {...register("username", {required: "Username jest wymagany"})}
             className={errors.username ? "border-red-500" : "border-gray-500"} 
             />
             {errors.username && (
                <span className="text-red-500">{errors.username.message}</span>
             )}
        </div>

        <div className="flex flex-col">
            <label>Hasło: </label>
             <input 
              type="password"
              {...register("password", { required: "Hasło jest wymagane",minLength: {value:12, message:"Długość hasła powinna wynosić minimum 12 znaków"}})}
              className={errors.password ? "border-red-500" : "border-gray-500"}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
        </div>

        <div className="flex flex-col">
            <label>Potwierdź hasło: </label>
             <input 
              type="password"
              {...register("confirmPassword", { required: "Potwierdź hasło", validate: (value) => value === currentPassword || "Hasła muszą być identyczne" })}
              className={errors.confirmPassword ? "border-red-500" : "border-gray-500"}
              />
              {errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword.message}</span>
              )}
        </div>

        <div className="flex flex-col">
            <label>Email: </label>
             <input 
              type="email"
              {...register("email", { required: "Email jest wymagany" })}
              className={errors.email ? "border-red-500" : "border-gray-500"}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
        </div>

        

        <button type="submit" className="btn btn-primary">
            Zarejestruj się
        </button>
    </form>
   )
}