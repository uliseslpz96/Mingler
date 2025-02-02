using Microsoft.Maui.Controls;
using MobileApp.ViewModels;

namespace MobileApp.Views
{
    public partial class ProfilePage : ContentPage
    {
        public ProfilePage()
        {
            InitializeComponent();

            BindingContext = new ProfileViewModel();
        }

        private async void OnSettingsClicked(object sender, EventArgs e)
        {
            await DisplayAlert("Configuraci�n", "Abrir pantalla de configuraci�n...", "OK");
        }

    }
}