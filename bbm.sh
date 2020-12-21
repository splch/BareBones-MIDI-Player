zip -r -9 --exclude=*.git* --exclude=*.DS_Store* --exclude=*.vscode* --exclude=*.sh* ../BareBones-MIDI-Player.zip *
echo "Input specific change:"
read change
git config --global user.email "spencer.l.churchill@gmail.com"
git config --global user.name "splch"
git add --all
git pull
git commit -m "$change"
git push -u origin master
