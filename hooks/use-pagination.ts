"use client"

import * as React from "react"

export interface PaginationOptions {
  initialPage?: number
  initialPageSize?: number
  pageSizeOptions?: number[]
}

export interface PaginationState {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface PaginationActions {
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  setTotalItems: (total: number) => void
  nextPage: () => void
  previousPage: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
  canGoNext: boolean
  canGoPrevious: boolean
}

export interface UsePaginationReturn extends PaginationState, PaginationActions {
  getPagedData: <T>(data: T[]) => T[]
  getPageInfo: () => string
  getPageRange: () => { start: number; end: number }
}

export function usePagination(options: PaginationOptions = {}): UsePaginationReturn {
  const { initialPage = 1, initialPageSize = 10, pageSizeOptions = [5, 10, 20, 50, 100] } = options

  const [currentPage, setCurrentPage] = React.useState(initialPage)
  const [pageSize, setPageSize] = React.useState(initialPageSize)
  const [totalItems, setTotalItems] = React.useState(0)

  const totalPages = Math.ceil(totalItems / pageSize)

  const setPage = React.useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page)
      }
    },
    [totalPages],
  )

  const handleSetPageSize = React.useCallback((size: number) => {
    setPageSize(size)
    // Reset to first page when changing page size
    setCurrentPage(1)
  }, [])

  const nextPage = React.useCallback(() => {
    setPage(currentPage + 1)
  }, [currentPage, setPage])

  const previousPage = React.useCallback(() => {
    setPage(currentPage - 1)
  }, [currentPage, setPage])

  const goToFirstPage = React.useCallback(() => {
    setPage(1)
  }, [setPage])

  const goToLastPage = React.useCallback(() => {
    setPage(totalPages)
  }, [setPage, totalPages])

  const canGoNext = currentPage < totalPages
  const canGoPrevious = currentPage > 1

  const getPagedData = React.useCallback(
    <T,>(data: T[]): T[] => {
      const startIndex = (currentPage - 1) * pageSize
      const endIndex = startIndex + pageSize
      return data.slice(startIndex, endIndex)
    },
    [currentPage, pageSize],
  )

  const getPageInfo = React.useCallback((): string => {
    if (totalItems === 0) return "No items"

    const start = (currentPage - 1) * pageSize + 1
    const end = Math.min(currentPage * pageSize, totalItems)
    return `Showing ${start}-${end} of ${totalItems} items`
  }, [currentPage, pageSize, totalItems])

  const getPageRange = React.useCallback((): { start: number; end: number } => {
    const start = (currentPage - 1) * pageSize + 1
    const end = Math.min(currentPage * pageSize, totalItems)
    return { start, end }
  }, [currentPage, pageSize, totalItems])

  // Reset to first page if current page exceeds total pages
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

  return {
    // State
    currentPage,
    pageSize,
    totalItems,
    totalPages,

    // Actions
    setPage,
    setPageSize: handleSetPageSize,
    setTotalItems,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    canGoNext,
    canGoPrevious,

    // Utilities
    getPagedData,
    getPageInfo,
    getPageRange,
  }
}
