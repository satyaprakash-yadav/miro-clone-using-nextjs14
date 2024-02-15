"use client";

import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList = ({ 
    orgId,
    query
}: BoardListProps) => {
    const data = [];    // TODO: Change to API call

    if (!data?.length && query.search) {
        return (
            // <div>
            //     Try searching for something else
            // </div>
            <EmptySearch />
        )
    }

    if (!data?.length && query.favorites) {
        return (
            // <div>
            //     No favorites
            // </div>
            <EmptyFavorites />
        )
    }
    
    if (!data?.length) {
        return (
            // <div>
            //     No boards at all
            // </div>
            <EmptyBoards />
        )
    }


    return (
        <div>
            {JSON.stringify(query)}
        </div>
    )
};