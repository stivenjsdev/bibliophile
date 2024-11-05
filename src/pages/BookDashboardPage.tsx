import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Edit, Plus, Search, Star, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Book = {
  id: string
  title: string
  author: string
  genre: string
  status: 'Por leer' | 'Leyendo' | 'Leído'
  rating: number
}

const initialBooks: Book[] = [
  { id: '1', title: 'Cien años de soledad', author: 'Gabriel García Márquez', genre: 'Realismo mágico', status: 'Leído', rating: 5 },
  { id: '2', title: 'El señor de los anillos', author: 'J.R.R. Tolkien', genre: 'Fantasía', status: 'Por leer', rating: 4 },
  { id: '3', title: '1984', author: 'George Orwell', genre: 'Distopía', status: 'Leyendo', rating: 4 },
]

export default function BookDashboard() {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [genreFilter, setGenreFilter] = useState<string>('')
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    let result = books
    if (statusFilter && statusFilter !== 'all') {
      result = result.filter(book => book.status === statusFilter)
    }
    if (genreFilter && genreFilter !== 'all') {
      result = result.filter(book => book.genre === genreFilter)
    }
    if (searchTerm) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredBooks(result)
  }, [books, statusFilter, genreFilter, searchTerm])

  const handleAddBook = (newBook: Omit<Book, 'id'>) => {
    const bookWithId = { ...newBook, id: Date.now().toString() }
    setBooks([...books, bookWithId])
    setIsDialogOpen(false)
  }

  const handleEditBook = (updatedBook: Omit<Book, 'id'>) => {
    if (editingBook) {
      const bookWithId = { ...updatedBook, id: editingBook.id }
      setBooks(books.map(book => book.id === editingBook.id ? bookWithId : book))
      setEditingBook(null)
      setIsDialogOpen(false)
    }
  }

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id))
  }

  const uniqueGenres = Array.from(new Set(books.map(book => book.genre)))

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDashboard={true} />
      <div className="container mx-auto p-4 flex-grow">
        {/* <h1 className="text-3xl font-bold mb-6">Bibliophile Dashboard</h1> */}
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 w-full md:w-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar por título o autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8"
            />
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Por leer">Por leer</SelectItem>
                <SelectItem value="Leyendo">Leyendo</SelectItem>
                <SelectItem value="Leído">Leído</SelectItem>
              </SelectContent>
            </Select>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {uniqueGenres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Añadir Libro
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingBook ? 'Editar Libro' : 'Añadir Nuevo Libro'}</DialogTitle>
                <DialogDescription>
                  {editingBook ? 'Modifica los detalles del libro seleccionado.' : 'Ingresa los detalles del nuevo libro.'}
                </DialogDescription>
              </DialogHeader>
              <BookForm
                book={editingBook}
                onSubmit={editingBook ? handleEditBook : handleAddBook}
                onCancel={() => {
                  setEditingBook(null)
                  setIsDialogOpen(false)
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map(book => (
            <Card key={book.id}>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary mb-2">{book.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Autor:</strong> {book.author}</p>
                <p><strong>Género:</strong> {book.genre}</p>
                <p><strong>Estado:</strong> {book.status}</p>
                <div className="flex items-center">
                  <strong className="mr-2">Valoración:</strong>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= book.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => {
                    setEditingBook(book)
                    setIsDialogOpen(true)
                  }}>
                    <Edit className="mr-2 h-4 w-4" /> Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteBook(book.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

type BookFormProps = {
  book?: Book | null
  onSubmit: (book: Omit<Book, 'id'>) => void
  onCancel: () => void
}

function BookForm({ book, onSubmit, onCancel }: BookFormProps) {
  const [title, setTitle] = useState(book?.title || '')
  const [author, setAuthor] = useState(book?.author || '')
  const [genre, setGenre] = useState(book?.genre || '')
  const [status, setStatus] = useState<Book['status']>(book?.status || 'Por leer')
  const [rating, setRating] = useState(book?.rating || 1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newBook: Omit<Book, 'id'> = { title, author, genre, status, rating }
    onSubmit(newBook)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="author">Autor</Label>
        <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="genre">Género</Label>
        <Input id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="status">Estado</Label>
        <Select value={status} onValueChange={(value: Book['status']) => setStatus(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Por leer">Por leer</SelectItem>
            <SelectItem value="Leyendo">Leyendo</SelectItem>
            <SelectItem value="Leído">Leído</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="rating">Valoración</Label>
        <Select value={rating.toString()} onValueChange={(value) => setRating(Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar valoración" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((value) => (
              <SelectItem key={value} value={value.toString()}>{value}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">{book ? 'Actualizar' : 'Añadir'}</Button>
      </div>
    </form>
  )
}