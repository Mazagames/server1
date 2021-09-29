namespace :app do

  task :test do
  end

  task :build do

    sh "NODE_ENV=production ./build.sh"
    archive "webapi", gnu_tar: true do
      add "node_modules"
      add_bundle
    end
  end

  task "deploy:git" do
    sh "NODE_ENV=production ./build.sh"
    sh "sv rr"
  end

  task "deploy:archive" do
    sh "sv rr"
  end

  task :reload do
    sh "sv rr"
  end

  task :reopen_logs do
    sh "sv rr"
    sh "sv reopen_logs"
  end

  task :stop do
    sh "sv stop"
  end

end
