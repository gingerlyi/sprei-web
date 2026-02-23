// File: app/admin/page.tsx
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  
  async function addProduct(formData: FormData) {
    "use server";
    const files = formData.getAll("images") as File[];
    let finalImageUrls: string[] = [];

    for (const file of files) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        finalImageUrls.push(`data:${file.type};base64,${buffer.toString("base64")}`);
      }
    }

    if (finalImageUrls.length === 0) {
      finalImageUrls.push("https://via.placeholder.com/400x400?text=No+Image");
    }

    await prisma.product.create({
      data: {
        name: formData.get("name") as string,
        price: parseInt(formData.get("price") as string),
        stock: parseInt(formData.get("stock") as string), // <-- Simpan Stok
        imageUrls: finalImageUrls,
        category: formData.get("category") as string,
        size: formData.get("size") as string,
        description: formData.get("description") as string,
      },
    });

    revalidatePath("/admin"); revalidatePath("/katalog"); revalidatePath("/");
  }

  async function editProduct(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const files = formData.getAll("images") as File[];
    
    let updateData: any = {
      name: formData.get("name") as string,
      price: parseInt(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string), // <-- Update Stok
      category: formData.get("category") as string,
      size: formData.get("size") as string,
      description: formData.get("description") as string,
    };

    let newImageUrls: string[] = [];
    for (const file of files) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        newImageUrls.push(`data:${file.type};base64,${buffer.toString("base64")}`);
      }
    }
    if (newImageUrls.length > 0) updateData.imageUrls = newImageUrls;

    await prisma.product.update({ where: { id }, data: updateData });
    revalidatePath("/admin"); revalidatePath("/katalog"); revalidatePath("/");
  }

  async function deleteProduct(formData: FormData) {
    "use server";
    await prisma.product.delete({
      where: { id: formData.get("id") as string },
    });
    revalidatePath("/admin"); revalidatePath("/katalog"); revalidatePath("/");
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminClient 
      products={products} 
      addAction={addProduct} 
      editAction={editProduct} 
      deleteAction={deleteProduct} 
    />
  );
}