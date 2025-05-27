import { z } from "zod";

export const LogoutSchema = z.object({
    result: z.boolean(),
});

export type Logout = z.infer<typeof LogoutSchema>;

export const UserSchema = z.object({
    favorites: z.array(z.string()).default([]), 
    surname: z.string(), 
    name: z.string(),
    email: z.string().email().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const FilmsSchema = z.object({
    id: z.number(),
    title: z.string(),
    posterUrl: z.string().nullable(),
    genres: z.array(z.string()).default([]),
    runtime: z.number(),
    releaseYear: z.number(),
    backdropUrl: z.string().nullable().optional(),
    production: z.string().nullable().optional(),
    trailerYouTubeId: z.string().optional(),
    language: z.string().optional(),
    tmdbRating: z.number(),
    revenue: z.string().nullable().optional(),
    plot: z.string().optional(),
    budget: z.string().nullable().optional(),
    releaseDate: z.string().optional(),
    director: z.string().nullable().optional(),
    awardsSummary: z.string().nullable().optional(),
    trailerUrl: z.string().optional(),
    originalTitle: z.string().optional(),
    searchL: z.string().optional(),
    homepage: z.string().optional(),
    status: z.union([z.string(), z.number()]).transform(String),
    keywords: z.array(z.string()).default([]),
    cast: z.array(z.string()).default([]),
    languages: z.array(z.string()).default([]),
    countriesOfOrigin: z.array(z.string()).default([]),
  });

export type Films = z.infer<typeof FilmsSchema>;

export const FilmsList = z.array(FilmsSchema);

export type FilmsList = z.infer<typeof FilmsList>;

export interface FetchMoviesParams {
    count?: number;
    page?: number;
    title?: string;
    genre?: string;
};

export const GenresSchema = z.array(z.string());
export type Genre = z.infer<typeof GenresSchema>;