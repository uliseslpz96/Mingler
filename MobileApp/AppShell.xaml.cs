using Microsoft.Maui.Controls;

namespace MobileApp
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();
        }

        private async void OnActionButtonClicked(object sender, EventArgs e) //, EventArgs e
        {
            // Acción que deseas realizar cuando se hace clic en el botón
            await DisplayAlert("Acción", "Hiciste clic en el botón", "OK");
        }
    }
}
