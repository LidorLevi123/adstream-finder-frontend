import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { DocsPage } from './pages/DocsPage'
import { AppHeader } from './cmps/AppHeader'


export function RootCmp() {
    return (
        <div className="main-layout">
            <AppHeader />

            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/docs" element={<DocsPage />} />
                </Routes>
            </main>
        </div>
    )
}


