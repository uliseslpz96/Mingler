import 'package:flutter/material.dart';
import 'features/news/presentation/screens/news_screen.dart';
import 'features/search/presentation/screens/search_screen.dart';
import 'features/add/presentation/screens/add_screen.dart';
import 'features/notifications/presentation/screens/notifications_screen.dart';
import 'features/profile/presentation/screens/profile_screen.dart';

import 'package:flutter_svg/flutter_svg.dart'; // Importar flutter_svg

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mingler',
      theme: ThemeData(
        appBarTheme: AppBarTheme(
          color: Colors.grey[700],
          toolbarHeight: 50,
          titleTextStyle: TextStyle(
              fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
        ),
      ),
      home: MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;
  final PageController _pageController = PageController();
  final List<int> _navigationHistory = [0]; // Historial de navegación

  final List<Widget> _screens = [
    NewsScreen(),
    SearchScreen(),
    AddScreen(),
    NotificationsScreen(),
    ProfileScreen(),
  ];

  void _onItemTapped(int index) {
    if (index != _selectedIndex) {
      setState(() {
        _navigationHistory
            .add(_selectedIndex); // Guarda la pantalla actual antes de cambiar
        _selectedIndex = index;
      });

      _pageController.animateToPage(
        index,
        duration: Duration(milliseconds: 500),
        curve: Curves.easeInOut,
      );
    }
  }

  Future<bool> _onWillPop() async {
    if (_navigationHistory.isNotEmpty) {
      setState(() {
        _selectedIndex =
            _navigationHistory.removeLast(); // Regresa a la pantalla anterior
      });

      _pageController.animateToPage(
        _selectedIndex,
        duration: Duration(milliseconds: 500),
        curve: Curves.easeInOut,
      );

      return false; // Evita que la app se cierre
    }
    // Si no hay historial, mostrar confirmación para salir
    return await _showExitConfirmation();
  }

  Future<bool> _showExitConfirmation() async {
    return await showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(
                "Estás saliendo de Mingler",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              content: Text("¿Desea salir de la aplicación?"),
              actions: [
                TextButton(
                  onPressed: () =>
                      Navigator.of(context).pop(false), // Cancela el cierre
                  child: Text("Cancelar"),
                ),
                TextButton(
                  onPressed: () =>
                      Navigator.of(context).pop(true), // Confirma salir
                  child: Text("Salir"),
                ),
              ],
            );
          },
        ) ??
        false; // Si el usuario cierra el diálogo sin elegir, no se sale
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onWillPop, // Maneja el gesto de "volver"
      child: Scaffold(
        appBar: AppBar(
          title: Row(
            mainAxisSize: MainAxisSize.min, // Ajusta el tamaño al contenido
            children: [
              SvgPicture.asset(
                "assets/images/cat.svg", // Ruta del SVG
                width: 45, // Ajusta el tamaño del icono
                height: 45,
                colorFilter: ColorFilter.mode(
                    Colors.white, BlendMode.srcIn), // Aplica el color
              ),
              Text(
                "Mingler",
                style: TextStyle(
                    fontFamily:
                        "OpenSansExtraBold", // Debe coincidir con el nombre en pubspec.yaml
                    fontSize: 25,
                    color: Colors.white),
              ),
            ],
          ),
          actions: [
            IconButton(
              icon: Icon(Icons.inbox, color: Colors.white70),
              onPressed: () {
                print('Botón de configuración presionado');
              },
            ),
          ],
        ),
        body: PageView(
          controller: _pageController,
          children: _screens,
          physics: NeverScrollableScrollPhysics(),
        ),
        bottomNavigationBar: Stack(
          alignment: Alignment.center,
          children: [
            Container(
              height: 50,
              decoration: BoxDecoration(color: Colors.grey[850]),
              child: BottomNavigationBar(
                currentIndex: _selectedIndex,
                onTap: _onItemTapped,
                type: BottomNavigationBarType.fixed,
                showSelectedLabels: false,
                showUnselectedLabels: false,
                selectedFontSize: 0,
                unselectedFontSize: 0,
                iconSize: 25,
                selectedItemColor: Colors.amber,
                unselectedItemColor: Colors.grey[400],
                items: [
                  BottomNavigationBarItem(
                      icon: Icon(Icons.dynamic_feed_rounded), label: ''),
                  BottomNavigationBarItem(icon: Icon(Icons.search), label: ''),
                  BottomNavigationBarItem(icon: SizedBox.shrink(), label: ''),
                  BottomNavigationBarItem(
                      icon: Icon(Icons.notifications), label: ''),
                  BottomNavigationBarItem(icon: Icon(Icons.person), label: ''),
                ],
              ),
            ),
            Positioned(
              bottom: 5,
              child: GestureDetector(
                onTap: () => _onItemTapped(2),
                child: Container(
                  width: 45,
                  height: 40,
                  decoration: BoxDecoration(
                    color: Colors.purple[500],
                    shape: BoxShape.rectangle,
                    borderRadius: BorderRadius.circular(5),
                  ),
                  child: Icon(Icons.add, color: Colors.white, size: 27),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
