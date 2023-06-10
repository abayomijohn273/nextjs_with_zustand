"use client"

import React from 'react'
import { useForm } from "react-hook-form";

const HookForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form className="w-6/12 mx-auto px-24 py-24 flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input className="border py-4 px-6" defaultValue="test" {...register("example")} />

            {/* include validation with required or other standard HTML validation rules */}
            <input className="border py-4 px-6" {...register("exampleRequired", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <input className="bg-black text-whitr py-4 text-center text-white" type="submit" />
        </form>
    );
}

export default HookForm