import { ReactNode } from "react";
import { MyState } from "../store";
export interface UserDetails {
  email: string;
  photoURL: string;
}
export interface Item {
  url: string;
  code: number;
  productCode: number;
  quantity?: number;
  price?: number;
}
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export interface SliderData {
  total: number;
  results: string[];
}
export interface CardProps {
  url: string;
  children: ReactNode;
  innerRef?: (node: HTMLDivElement) => void;
}
export interface ErrorInterface {
  status: number;
  data: { message: string };
}
export interface Category {
  CatName: string;
  tagCodes: string[];
}
export interface ItemDetails {
  name: string;
  description: string;
  price: number;
}
export type { MyState };
