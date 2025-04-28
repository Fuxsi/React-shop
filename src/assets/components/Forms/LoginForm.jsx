import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";



const yupSchema = yup.object().shape ({
   title: yup
    .string()
    .required("Wymagany tytuł")
    .min(3, "Minimalna długość: 3 znaki")
    .max(100, "Maksymalna długość: 100 znaków"),

   price: yup
    .number()
    .typeError("Cena musi być liczbą")
    .required("Cena jest wymagana")
    .positive("Cena nie może być ujemna")
    .moreThan(0, "Cena musi być większa niż 0"),

   description: yup
    .string()
    .required("Opis wymagant")
    .min(10, "Minimalna długość opisu: 10")
    .max(500, "Maksymalna długość opisu: 500"),
});

export default function LoginForm() {
    const [apiError, setApiError] = useState(null);
    const [succsess, setSuccess] = useState(null);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
        const{
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(yupSchema)
    });

   const onSubmit = async (data) => {
    setApiError(null);
    setSuccess(null);
    setIsFormSubmitting(true);
    console.log("Dane formularza: ", data);
    try {
        const response = await axios.post(
            "https://fakestoreapi.com/auth/login",
            data
        );
        if (response) {
            setSuccess(true);
            reset();
        }
        setIsFormSubmitting(false);
    } catch (e) {
        if(e.status===401) {
            setApiError (
                "Dane logowania niepoprawne lub użytkownik nie istnieje"
            );
    
    } else {
    setApiError("Wystąpił nieznany błąd")
}        
setIsFormSubmitting(false);

    }
    
   };
   
   return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
        <h1>Logowanie</h1>
        {apiError && <span>{apiError}</span>}
        {succsess && <span>Sukces</span>}
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
              {...register("password", { required: "Hasło jest wymagane" })}
              className={errors.password ? "border-red-500" : "border-gray-500"}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
        </div>

        <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isSubmitting || isFormSubmitting }
        >
            Zaloguj się
        </button>
    </form>
   )
}