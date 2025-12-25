import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log("Creating Residency with data:", req.body.data);

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price: parseInt(price), // <--- FIX: Forces price to be a Number
        address,
        country,
        city,
        facilities,
        image,
        owner: { 
          connect: { email: userEmail } // Connects to the User who is posting
        },
      },
    });

    res.send({ message: "Residency created successfully", residency });

  } catch (err) {
    // Error Handling
    if (err.code === "P2002") {
      throw new Error("A residency with this address already exists");
    }
    // "Record to connect not found" (This means the User doesn't exist in DB)
    if (err.code === "P2025") {
      throw new Error("User not found in database. Please logout and login again.");
    }
    
    // Log the full error to your server console so you can see it in Vercel logs
    console.error("Error creating residency:", err);
    throw new Error(err.message);
  }
});

// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});