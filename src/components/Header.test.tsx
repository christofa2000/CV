
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { CustomThemeProvider } from '../ThemeContext';

// Mock para el componente de Avatar para evitar problemas con la imagen estática
jest.mock('@mui/material/Avatar', () => () => <div data-testid="mock-avatar" />);

describe('Header Component', () => {
  it('debe renderizar el nombre completo del usuario', () => {
    // Renderizamos el componente Header dentro del proveedor de temas
    render(
      <CustomThemeProvider>
        <Header />
      </CustomThemeProvider>
    );

    // Buscamos el nombre en el documento
    const nameElement = screen.getByText(/Christian Oscar Papa/i);

    // Verificamos que el elemento exista
    expect(nameElement).toBeInTheDocument();
  });
});
