import type React from "react"
import { useState, useEffect } from "react"
import { Search, Trash2 } from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { useDebounce } from "../hooks/useDebounce"
import { Pagination } from "../components/common/Pagination"

interface Transaction {
  id: string
  date: string
  userName: string
  paymentMethod: "Stripe" | "Bank Transfer"
  amount: string
  currency: string
  status: "Paid" | "Pending" | "Failed"
}

// Mock API function to simulate server data fetching
const fetchTransactions = async (
  page: number,
  search = "",
): Promise<{
  transactions: Transaction[]
  totalPages: number
  totalCount: number
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const allTransactions: Transaction[] = [
    {
      id: "TXN-1001",
      date: "08 Aug, 10:30",
      userName: "Ricardo Mathew",
      paymentMethod: "Stripe",
      amount: "£500",
      currency: "USD",
      status: "Paid",
    },
    {
      id: "TXN-1002",
      date: "07 Aug, 10:30",
      userName: "John Smith",
      paymentMethod: "Stripe",
      amount: "£1200",
      currency: "USD",
      status: "Paid",
    },
    {
      id: "TXN-1003",
      date: "06 Aug, 10:30",
      userName: "Ricardo Mathew",
      paymentMethod: "Stripe",
      amount: "£1200",
      currency: "USD",
      status: "Paid",
    },
    {
      id: "TXN-1004",
      date: "05 Aug, 10:30",
      userName: "John Smith",
      paymentMethod: "Stripe",
      amount: "£1200",
      currency: "USD",
      status: "Pending",
    },
    {
      id: "TXN-1005",
      date: "04 Aug, 10:30",
      userName: "Ricardo Mathew",
      paymentMethod: "Bank Transfer",
      amount: "£500.00",
      currency: "USD",
      status: "Pending",
    },
    {
      id: "TXN-1006",
      date: "01 Aug, 10:30",
      userName: "John Smith",
      paymentMethod: "Stripe",
      amount: "£500.00",
      currency: "USD",
      status: "Pending",
    },
    {
      id: "TXN-1007",
      date: "01 Aug, 10:30",
      userName: "Ricardo Mathew",
      paymentMethod: "Bank Transfer",
      amount: "£500.00",
      currency: "USD",
      status: "Failed",
    },
    {
      id: "TXN-1008",
      date: "31 Jul, 10:30",
      userName: "Sarah Wilson",
      paymentMethod: "Stripe",
      amount: "£750",
      currency: "USD",
      status: "Paid",
    },
    {
      id: "TXN-1009",
      date: "30 Jul, 10:30",
      userName: "Mike Johnson",
      paymentMethod: "Bank Transfer",
      amount: "£300.00",
      currency: "USD",
      status: "Failed",
    },
    {
      id: "TXN-1010",
      date: "29 Jul, 10:30",
      userName: "Emma Davis",
      paymentMethod: "Stripe",
      amount: "£900",
      currency: "USD",
      status: "Paid",
    },
  ]

  // Filter transactions based on search
  const filteredTransactions = search
    ? allTransactions.filter(
        (transaction) =>
          transaction.userName.toLowerCase().includes(search.toLowerCase()) ||
          transaction.id.toLowerCase().includes(search.toLowerCase()) ||
          transaction.paymentMethod.toLowerCase().includes(search.toLowerCase()),
      )
    : allTransactions

  const itemsPerPage = 7
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const transactions = filteredTransactions.slice(startIndex, endIndex)

  return {
    transactions,
    totalPages,
    totalCount: filteredTransactions.length,
  }
}

export function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true)
      try {
        const data = await fetchTransactions(currentPage, debouncedSearchTerm)
        setTransactions(data.transactions)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error("Failed to fetch transactions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [currentPage, debouncedSearchTerm])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const getStatusBadgeVariant = (status: Transaction["status"]) => {
    switch (status) {
      case "Paid":
        return "default" // Green
      case "Pending":
        return "secondary" // Yellow
      case "Failed":
        return "destructive" // Red
      default:
        return "default"
    }
  }

  const getPaymentMethodBadgeVariant = (method: Transaction["paymentMethod"]) => {
    return "outline"
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Transaction</h1>
        <p className="text-gray-600">Show all Transaction</p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search .."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center gap-1">
                    Transaction ID
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">User Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Payment Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Currency</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Loading skeleton
                Array.from({ length: 7 }).map((_, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 px-4 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{transaction.id}</td>
                    <td className="py-4 px-4 text-gray-600">{transaction.date}</td>
                    <td className="py-4 px-4 text-gray-900">{transaction.userName}</td>
                    <td className="py-4 px-4">
                      <Badge variant={getPaymentMethodBadgeVariant(transaction.paymentMethod)} className="text-xs">
                        {transaction.paymentMethod}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">{transaction.amount}</td>
                    <td className="py-4 px-4 text-gray-600">{transaction.currency}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={getStatusBadgeVariant(transaction.status)}
                        className={`text-xs ${
                          transaction.status === "Paid"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : transaction.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                        }`}
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && totalPages > 1 && (
        <div className="mt-6">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  )
}
