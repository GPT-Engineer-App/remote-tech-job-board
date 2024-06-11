import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, defaultQueryFn } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: defaultQueryFn,
        },
    },
});
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

Jobs // table: jobs
    id: number
    created_at: string
    job_title: string
    job_description: string
    job_function: string

Profiles // table: profiles
    id: number
    created_at: string
    username: string
    avatar_url: string

*/

// Hooks for Jobs table

export const useJobs = () => useQuery({
    queryKey: ['jobs'],
    queryFn: () => fromSupabase(supabase.from('Jobs').select('*')),
});

export const useAddJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newJob) => fromSupabase(supabase.from('Jobs').insert([newJob])),
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        },
    });
};

export const useUpdateJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedJob) => fromSupabase(supabase.from('Jobs').update(updatedJob).eq('id', updatedJob.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        },
    });
};

export const useDeleteJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('Jobs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        },
    });
};

// Hooks for Profiles table

export const useProfiles = () => useQuery({
    queryKey: ['profiles'],
    queryFn: () => fromSupabase(supabase.from('Profiles').select('*')),
});

export const useAddProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProfile) => fromSupabase(supabase.from('Profiles').insert([newProfile])),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedProfile) => fromSupabase(supabase.from('Profiles').update(updatedProfile).eq('id', updatedProfile.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

export const useDeleteProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('Profiles').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};