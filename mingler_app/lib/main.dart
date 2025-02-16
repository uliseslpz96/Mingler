import 'package:flutter/material.dart';
import 'features/news/presentation/screens/news_screen.dart';
import 'features/search/presentation/screens/search_screen.dart';
import 'features/add/presentation/screens/add_screen.dart';
import 'features/notifications/presentation/screens/notifications_screen.dart';
import 'features/profile/presentation/screens/profile_screen.dart';

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
          color: Colors.grey[700], // Color de la AppBar
          toolbarHeight: 50, // Altura de la AppBar (más delgada)
          titleTextStyle: TextStyle(
            fontSize: 24, // Tamaño del título
            fontWeight: FontWeight.bold, // Título en negritas
            color: Colors.white, // Color del título
          ),
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

  final List<Widget> _screens = [
    NewsScreen(),
    SearchScreen(),
    AddScreen(),
    NotificationsScreen(),
    ProfileScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
      _pageController.animateToPage(
        index,
        duration: Duration(milliseconds: 300),
        curve: Curves.easeInOut, // Suaviza la animación
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Mingler'),
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
        physics: NeverScrollableScrollPhysics(), // Desactiva el swipe manual
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
    );
  }
}
