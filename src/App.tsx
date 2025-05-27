import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
import { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { Header } from './components/header/Header';
import { Footer } from './components/Footer';
import { UserPage } from './pages/UserPage/UserPage';
import { SettingForm } from './components/SettingForm';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { GenresForm } from './components/GenresForm';
import { FilmsForm } from './components/FilmsForm';

function App() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>  
      <Header onAccountClick={() => setIsAccountModalOpen(true)} />
        <Routes>
          <Route path="/" element={<MainPage onClick={() => setIsAccountModalOpen(true)} />} />
          <Route path="/favorites" element={<UserPage />} />
          <Route path="/setting" element={<SettingForm />} />
          <Route path="/about" element={<AboutPage onClick={() => setIsAccountModalOpen(true)} />} />
          <Route path="/genres" element={<GenresForm />} />
          <Route path="/films" element={<FilmsForm />} />
        </Routes>
        {isAccountModalOpen && (
          <AuthForm onClose={() => setIsAccountModalOpen(false)}/>
        )}
        <Footer />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
