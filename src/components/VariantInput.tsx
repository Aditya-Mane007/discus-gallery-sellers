"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import Separator from "@/components/ui/Separator";

const formSchema = z.object({
  quantity: z
    .number()
    .int()
    .positive()
    .min(1, "Quantity must be greater than 0"),
  price: z.number().positive().min(1, "Price must be greater than 0"),
});
function VariantInput({ formData }) {
  console.log(formData.getValues("variants"));

  const variants = formData.getValues("variants");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      price: 1,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    variants.push({ quantity: values.quantity, price: values.price });
  }
  return (
    <div className="flex max-md:block">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[50%] max-md:w-full flex"
        >
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity (In Grams)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g 800g"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                    className="w-[95%]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (In ₹)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g ₹800"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                    className="w-[95%]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-12">
            Submit
          </Button>
        </form>
      </Form>
      <div className="w-[50%] my-8 mx-auto px-3 max-md:my-0 max-md:px-0 max-md:w-full">
        {variants.length > 0 ? (
          <>
            <ul>
              {variants.map((variant) => (
                <li className="w-full py-2 px-4 mb-2 bg-[#E4E4E7] dark:bg-[#27272A]">
                  <div>
                    {variant.quantity}
                    {variant.price}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h2>No Variants Are Added Yet.</h2>
        )}
      </div>
    </div>
  );
}

export default VariantInput;
