"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const formSchema = z.object({
  image: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Image is required.",
  }),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function page() {
  // const [previewImage, setPrevirewImage] = useState<String>("");
  // const imageInput = useRef<HTMLInputElement>(null);
  // const [isDragging, setIsDragging] = useState(false);
  // const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();

  console.log(user);

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     image: null,
  //     name: "",
  //     description: "",
  //   },
  // });

  // function onHandleFileChange(file: File) {
  //   const imageUrl = URL.createObjectURL(file);
  //   setPrevirewImage(imageUrl);

  //   form.setValue("image", file);

  //   // const fileReader = new FileReader();
  //   // fileReader.readAsDataURL(file);
  //   // fileReader.onloadend = () => {
  //   //   form.setValue("image", fileReader.result);
  //   // };

  //   console.log(form.getValues("image"));
  //   console.log(previewImage);
  // }

  // function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragging(true);
  // }

  // function handlerDragLeave(e: React.DragEvent<HTMLDivElement>) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragging(false);
  // }

  // function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
  //   e.preventDefault();
  //   e.stopPropagation();
  // }

  // function handleDrop(e: React.DragEvent<HTMLDivElement>) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragging(false);
  //   const file = e.dataTransfer.files[0];
  //   onHandleFileChange(file);
  // }

  // function handleRemove() {
  //   setPrevirewImage("");
  //   form.setValue("image", "");
  // }

  // const updateStore = async (formData: {
  //   description: string;
  //   image: File;
  //   name: string;
  // }) => {
  //   const res = await axios.patch("http://localhost:3000/api/store", formData);
  //   const result = await res.data();
  //   console.log(result);
  // };
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   const formData = new FormData();
  //   formData.append("image", values.image);
  //   formData.append("name", values.name);
  //   formData.append("description", values.description);

  //   updateStore(formData);
  // }

  // const createUser = async (
  //   userData:
  //     | {
  //         id: string | undefined;
  //         image: string | undefined;
  //         owner: string | null | undefined;
  //         email: string | undefined;
  //         phone: string | undefined;
  //         onboarded: boolean;
  //       }
  //     | null
  //     | undefined
  // ) => {
  //   const res = await axios.post("http://localhost:3000/api/store", userData);
  //   const data = res.data;
  // };

  // useEffect(() => {
  //   if (isLoaded) {
  //     const formData = {
  //       id: user?.id,
  //       image: user?.imageUrl,
  //       owner: user?.fullName,
  //       email: user?.emailAddresses[0].emailAddress,
  //       phone: user?.phoneNumbers[0].phoneNumber,
  //       onboarded: false,
  //     };
  //     createUser(formData);
  //   }
  // }, [user]);

  return (
    <div>Hello</div>
    //   <div className="w-[40%] max-md:w-[90%]">
    //     <Form {...form}>
    //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //         <FormField
    //           control={form.control}
    //           name="image"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Store Logo/image</FormLabel>
    //               <FormControl>
    //                 <div
    //                   onDragEnter={handleDragEnter}
    //                   onDragLeave={handlerDragLeave}
    //                   onDragOver={handleDragOver}
    //                   onDrop={handleDrop}
    //                   onClick={() => imageInput.current?.click()}
    //                 >
    //                   {previewImage ? (
    //                     <div className="relative w-28 h-28">
    //                       <img
    //                         src={previewImage}
    //                         alt="Store Logo"
    //                         className="w-28 h-full"
    //                       />
    //                       <Button
    //                         className="absolute h-8 top-1 right-0"
    //                         variant="destructive"
    //                         onClick={handleRemove}
    //                       >
    //                         <X className="w-2 h-2" />
    //                       </Button>
    //                     </div>
    //                   ) : (
    //                     <div className="w-full h-28 border-2 border-dashed cursor-pointer flex justify-center items-center text-gray">
    //                       <p className="mt-2 text-sm text-muted-foreground">
    //                         {isDragging
    //                           ? "Drop to upload"
    //                           : "Drag and drop images here or click to upload"}
    //                       </p>
    //                     </div>
    //                   )}
    //                 </div>
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />

    //         <Input
    //           ref={imageInput}
    //           type="file"
    //           accept="image/*"
    //           onChange={(e) => onHandleFileChange(e.target.files[0])}
    //           className="hidden"
    //         />
    //         <FormField
    //           control={form.control}
    //           name="name"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Store Name</FormLabel>
    //               <FormControl>
    //                 <Input placeholder="e.g. Disucs Gallery" {...field} />
    //               </FormControl>

    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name="description"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Store Description</FormLabel>
    //               <FormControl>
    //                 <Textarea
    //                   className="min-h-[155px]"
    //                   placeholder="e.g.Welcome to Discus Gallery, your one-stop shop for all things discus fish! We offer a wide selection of healthy discus, premium fish food, and essential accessories to create the perfect aquatic environment. Whether you're a seasoned aquarist or a beginner, our knowledgeable staff is here to help you every step of the way. Dive into our vibrant collection today!
    //                   "
    //                   {...field}
    //                 />
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         <Button type="submit">Submit</Button>
    //       </form>
    //     </Form>
    //   </div>
    // );
  );
}

export default page;
