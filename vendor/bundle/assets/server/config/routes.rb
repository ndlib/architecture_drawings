Rails.application.routes.draw do
  mount HesburghAssets::Engine, at: "/hesburgh_assets"

  root :to => 'style_guide#index'

  match 'bootstrap' => 'bootstrap#index'
  match 'bootstrap/:action' => 'bootstrap', as: 'bootstrap'

  match 'admin' => 'admin#index'
  match 'admin/:action' => 'admin', as: 'admin'

  match 'rarebooks' => 'rarebooks#index'
  match 'rarebooks/:action' => 'rarebooks', as: 'rarebooks'
  match 'css/navigation.css', :to => redirect('/assets/hesburgh_assets/rarebooks/1.0/navigation.css')

  scope '/catalog' do
    match '/' => 'catalog#index', as: 'catalog_root'

    match ':action' => 'catalog', as: 'catalog'
  end

  match ':action' => 'style_guide', as: 'style_guide'
end
