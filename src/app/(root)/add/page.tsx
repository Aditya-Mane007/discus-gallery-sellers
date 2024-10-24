"use client";
import React, { useState } from "react";
import ImageInput from "@/components/ImageInput";
import { TrashIcon } from "@radix-ui/react-icons";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  images: z
    .array(z.instanceof(File))
    .min(1, {
      message: "At least 5 images are required.",
    })
    .max(5, {
      message: `Maximum of 5 images allowed.`,
    }),
  category: z.string().min(1, {
    message: "Please select catgory of product",
  }),
  variants: z
    .array(
      z.object({
        quantity: z.number().min(1, { message: "String value is required" }),
        price: z.number().nonnegative(),
      })
    )
    .nonempty(),
});

function page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
      category: "",
      variants: [],
    },
  });

  const [variantInput, setVariantInput] = useState({
    quantity: "",
    price: "",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  fields.forEach((field) => {
    console.log(field);
  });

  const formDataJSON = {
    images: form.getValues("images"),
    name: form.getValues("name"),
    description: form.getValues("description"),
    category: form.getValues("category"),
    variants: form.getValues("variants"),
  };

  const handleAddVariant = () => {
    if (Number(variantInput.quantity) > 0 && Number(variantInput.price) > 0) {
      const varianstsData = {
        quantity: Number(variantInput.quantity),
        price: Number(variantInput.price),
      };
      append(varianstsData); // Append input values to variants array
      setVariantInput({ quantity: "", price: "" }); // Clear input fields after adding
    }
  };

  // console.log(formDataJSON);
  function onSubmit(values: z.infer<typeof formSchema>) {
    // if (values.variants.length < 1) {
    //   alert("Please add variants");
    // } else {
    console.log("Form Values: ", values);
    console.log("Validation Errors: ", form.formState.errors); // Log validation errors
    console.log(formDataJSON);
    console.log("Submitting form..."); // This should log when submitting
    console.log(values); // Check if the values are being populated correctly
    // }
  }
  return (
    <div className="addProductForm w-full min-h-screen max-md:w-[100%]">
      <div className="h-auto max-md:h-auto ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full h-auto flex max-md:flex-col"
          >
            <div className="div2 w-[50%] h-auto max-md:w-full px-3">
              <ImageInput form={form} />
            </div>
            <div className="div3 w-[50%] max-md:w-full px-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name of product" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description of product"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            <SelectItem value="Flakes">Flakes</SelectItem>
                            <SelectItem value="Pellets">Pellets</SelectItem>
                            <SelectItem value="Frozen">Frozen</SelectItem>
                            <SelectItem value="Live">Live</SelectItem>
                            <SelectItem value="Dried">Dried</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Variants Input */}
              <div className="w-full mt-4">
                <h3 className="mb-2">Add Variant</h3>
                <div className="flex items-center space-x-4 mb-2">
                  <Input
                    placeholder="e.g 100g (In grams)"
                    value={variantInput.quantity}
                    onChange={(e) =>
                      setVariantInput((prev) => ({
                        ...prev,
                        quantity: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="e.g ₹1000 (In Rupees)"
                    value={variantInput.price}
                    onChange={(e) =>
                      setVariantInput((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                  />
                  <Button type="button" onClick={handleAddVariant}>
                    Add Variant
                  </Button>
                </div>

                {/* Display variants */}
                {fields.map((field, index) => (
                  <div className="flex justify-between items-center my-4 bg-[#E4E4E7] dark:bg-[#27272A] p-2 px-4 rounded">
                    <div key={field.id} className="">
                      <span className="mr-2">Quantity: {field.quantity}</span>
                      <span>Price: {field.price}</span>
                    </div>
                    <Button variant="destructive" onClick={() => remove(index)}>
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="submit" className="mt-2">
                Add Product
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {/* <div className="div4 w-full px-3">
        <VariantInput
          variantsData={form.getValues("variants")}
          append={append}
          remove={remove}
        />
      </div> */}
      {/* <Button
        className="div5 mx-3 w-auto max-md:w-full h-12 mt-0 max-md:mt-8 bg-[#E4E4E7] dark:bg-[#27272A]"
        onClick={() => submitRef.current?.click()}
      >
        Add Product
      </Button> */}
    </div>
  );
}

export default page;
