import 'package:flutter/material.dart';

class SideMenu extends StatelessWidget {
  const SideMenu({super.key});

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final simple = screenWidth < 1100;

    return Padding(
        padding: const EdgeInsets.all(16.0),
        child: Container(
          decoration: BoxDecoration(
            color: Theme.of(context)
                .primaryColor, // Set your desired background color
            borderRadius:
                BorderRadius.circular(16), // Set the desired border radius
            boxShadow: [
              BoxShadow(
                color: Theme.of(context).shadowColor,
                offset: const Offset(0, 2),
                blurRadius: 4,
                spreadRadius: 0,
              ),
            ],
          ),
          width: simple ? 76 : 300,
          height: double.infinity,
          child: Column(mainAxisSize: MainAxisSize.max, children: [
            _SideMenuOption(
                icon: Icons.home, title: "Home", onTap: () {}, simple: simple),
            _SideMenuOption(
                icon: Icons.balance,
                title: "Accounts",
                onTap: () {},
                simple: simple)
          ]),
        ));
  }
}

class _SideMenuOption extends StatefulWidget {
  final IconData icon;
  final String title;
  final VoidCallback onTap;
  final bool simple;

  const _SideMenuOption(
      {Key? key,
      required this.icon,
      required this.title,
      required this.onTap,
      required this.simple})
      : super(key: key);

  @override
  _SideMenuOptionState createState() => _SideMenuOptionState();
}

class _SideMenuOptionState extends State<_SideMenuOption> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Color?> _animation;

  bool isHovered = false;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this
    );

    _animation = ColorTween(
      begin: Colors.transparent,
      end: Colors.blue,
    ).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.easeInOut,
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
        onTap: widget.onTap,
        onHover: (hover) {
          if (hover) {
            _controller.forward();
          } else {
            _controller.reverse();
          }
          setState(() {
            isHovered = hover;
          });
        },
        child: AnimatedBuilder(
            animation: _animation,
            builder: (context, child) {
              return Container(
                  color: _animation.value,
                  padding: const EdgeInsets.symmetric(
                      vertical: 8.0, horizontal: 16.0),
                  child: Row(
                      mainAxisAlignment: widget.simple
                          ? MainAxisAlignment.center
                          : MainAxisAlignment.start,
                      children: [
                        Container(
                            alignment: Alignment.center,
                            child: Icon(
                              widget.icon,
                              size: 28.0,
                            )),
                        SizedBox(width: widget.simple ? 0 : 15),
                        Container(
                            child: widget.simple
                                ? null
                                : Text(widget.title,
                                    overflow: TextOverflow.ellipsis)),
                      ]));
            }));
  }
}
