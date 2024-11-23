"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X, Plus, Image as ImageIcon, Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import Image from "next/image";

interface ImageFile {
  file: File;
  preview: string;
}

const MAX_IMAGES = 5;

export default function ImageInput({ form }: { form: any }) {
  const [images, setImages] = useState<ImageFile[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && images.length < MAX_IMAGES) {
      const remainingSlots = MAX_IMAGES - images.length;
      const filesToAdd = Array.from(files).slice(0, remainingSlots);
      const newImages = filesToAdd.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages([...images, ...newImages]);
      form.setValue("images", [...form.getValues("images"), ...filesToAdd]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
    form.setValue(
      "images",
      form.getValues("images").filter((_: any, i: number) => i !== index)
    );
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    handleFileChange(files);
  };

  return (
    <>
      <FormField
        control={form.control}
        name="images"
        render={() => (
          <FormItem>
            <FormLabel>Images</FormLabel>
            <FormControl>
              <div
                className="w-full h-auto relative"
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div
                  className={`w-full border-2 border-dashed rounded-md ${isDragging} "border-primary" : "border-muted-foreground"`}
                >
                  {images.length > 0 ? (
                    <div className="w-full h-80">
                      <Carousel>
                        <CarouselContent>
                          {images.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className="relative aspect-square">
                                <div className="relative aspect-square">
                                  <img
                                    src={image.preview}
                                    alt={image.file.name}
                                    className="w-full h-80 rounded-md"
                                  />
                                  <Button
                                    className="absolute top-1 right-1"
                                    variant="destructive"
                                    onClick={() => {
                                      handleRemove(index);
                                    }}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CarouselItem>
                          ))}
                          {images.length < MAX_IMAGES && (
                            <CarouselItem>
                              <div
                                className="flex items-center justify-center w-full h-80 bg-muted rounded-md cursor-pointer transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <div className="text-center">
                                  <Plus className="mx-auto h-12 w-12 text-muted-foreground" />
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    Add Image
                                  </p>
                                </div>
                              </div>
                            </CarouselItem>
                          )}
                        </CarouselContent>
                      </Carousel>
                    </div>
                  ) : (
                    <>
                      <div
                        className="flex items-center justify-center w-full aspect-video bg-muted rounded-md cursor-pointer transition-colors h-80 max-lg:h-72"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="text-center">
                          {isDragging ? (
                            <Upload className="mx-auto h-12 w-12 text-primary" />
                          ) : (
                            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                          )}
                          <p className="mt-2 text-sm text-muted-foreground">
                            {isDragging
                              ? "Drop to upload"
                              : "Drag and drop images here or click to upload"}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e.target.files)}
                    className="w-full h-full absolute top-0 hidden"
                    ref={fileInputRef}
                  />
                  <p className="h-8 mt-2 text-sm text-muted-foreground text-center flex items-center justify-center">
                    {images.length} of {MAX_IMAGES} images uploaded
                  </p>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
